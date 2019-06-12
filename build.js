import React from 'react'
import ReactDOMServer from 'react-dom/server'
import glob from 'globby'
import chokidar from 'chokidar'
import path from 'path'
import fs from 'fs-extra'
import sass from 'node-sass'
import decache from 'decache'
import browserSync from 'browser-sync'

import Template from './src/Template'

class Builder {
  browserSync = browserSync.create()

  globs = {
    css: './tmp/**/*.scss',
    js: './tmp/**/*.js',
    pages: './tmp/pages/**/*.js',
  }

  constructor(){
    this.run()
  }

  requireMap = {}

  async run(){
    await this.cleanup()
    await this.initialBuild()
    await this.startBrowserSync()
    await this.watch()
  }

  async initialBuild(){
    const cssFiles = await glob(this.globs.css)
    this.log('Build', `Building ${cssFiles.length} css file(s)...`);
    await Promise.all(cssFiles.map(this.convertCssToJS))

    const jsFiles = await glob(this.globs.js, { ignore: [this.globs.pages] })
    this.log('Build', `Building ${jsFiles.length} js file(s)...`);
    await Promise.all(jsFiles.map(this.attachRequireNotice))

    const pages = await glob(this.globs.pages)
    this.log('Build', `Building ${pages.length} page(s)...`);
    await Promise.all(pages.map(this.convertToStatic))
  }

  log(tag, msg){
    console.log(`[${tag}]`, msg)
  }

  async startBrowserSync(){
    this.browserSync.init({
       server: "./dist",
       logLevel: "silent"
    })
  }

  async cleanup(){
    this.log('Preprocess', 'Cleaning up...')
    await fs.ensureDir('./tmp')
    await fs.emptyDir('./tmp')
    await fs.copy('./src', './tmp')

    await fs.ensureDir('./dist')
    await fs.emptyDir('./dist')
  }

  async watch(){
    this.log('Watch', 'Watching all files in /src...')

    const cssWatcher = chokidar.watch('./src/**/*.scss', { ignoreInitial: true })
    cssWatcher
      .on('add', this.styleFileDidChange)
      .on('change', this.styleFileDidChange)

    const pageWatcher = chokidar.watch('./src/pages/**/*.js', { ignoreInitial: true })
    pageWatcher
      .on('add', this.pageFileDidChange)
      .on('change', this.pageFileDidChange)

    const jsWatcher = chokidar.watch('./src/**/*.js', { ignoreInitial: true, ignored: ['./src/pages/**/*.js']})
    jsWatcher
      .on('add', this.jsFileDidChange)
      .on('change', this.jsFileDidChange)
  }

  pageFileDidChange = async(path) => {
    this.startTime = Date.now()
    await this.copyToTmp(path)
    path = this.pathToTmp(path)
    await this.convertToStatic(path)
  }

  styleFileDidChange = async(path) => {
    this.startTime = Date.now()
    await this.copyToTmp(path)
    path = this.pathToTmp(path)
    await this.convertCssToJS(path)

    const pages = await this.findRequireInPage('css', path)
    pages.map(this.convertToStatic)
  }

  jsFileDidChange = async(path) => {
    this.startTime = Date.now()
    await this.copyToTmp(path)
    path = this.pathToTmp(path)
    await this.attachRequireNotice(path)

    const pages = await this.findRequireInPage('js', path)
    pages.map(this.convertToStatic)
  }

  pathToTmp = (path) => {
    return path.replace(/^[\.\/]*[a-zA-Z]+\//, './tmp/')
  }

  async attachRequireNotice(path){
    let content = await fs.readFile(path, 'utf-8')
    if(content.substr(0,6) !== 'global'){
      content = `global.jsRequire ? global.jsRequire.push('${path}') : global.jsRequire = ['${path}'];
${content}`
    }
    await fs.writeFile(path, content)
  }

  async findRequireInPage(type, path){
    const pagePaths = Object.keys(this.requireMap)
    let page, found = []
    for(let i = 0; i < pagePaths.length; i++){
      page = pagePaths[i]
      if(this.requireMap[page][type].indexOf(path) !== -1){
        found.push(page)
      }
    }
    return found
  }

  async copyToTmp(path){
    const exits = await fs.pathExists(path)
    await fs.copy(path, this.pathToTmp(path))
  }

  convertCssToJS = async(path) => {
    path = this.pathToTmp(path)

    const content = await fs.readFile(path, 'utf-8')
    if(content.substr(0,6) === 'global'){
      return
    }

    const newContent = `global.cssRequire ? global.cssRequire.push('${path}') : global.cssRequire = ['${path}'];`
    await fs.ensureFile(path)
    await fs.writeFile(path, newContent);
  }

  convertToStatic = async(path) => {
    let Page, html;
    global.cssRequire = []
    global.jsRequire = []

    if(!this.startTime){
      this.startTime = Date.now()
    }

    path = this.pathToTmp(path)

    try {
        decache(`${path}`)
        Page = require(`${path}`)?.default
    } catch (e) {
      console.log(e)
      console.error(e);
      return
    }

    const cssRequire = (this.requireMap[path]?.css || [])
    global.cssRequire.forEach(i => {
      i = i.substr(0,2) !== './' ? `./${i}` : i
      if(cssRequire.indexOf(i) === -1){
        cssRequire.push(i)
      }
    })

    const jsRequire = (this.requireMap[path]?.js || [])
    global.jsRequire.forEach(i => {
      i = i.substr(0,2) !== './' ? `./${i}` : i
      if(jsRequire.indexOf(i) === -1){
        jsRequire.push(i)
      }
    })

    this.requireMap[path] = {css: cssRequire, js: jsRequire }

    // Process all the css.
    await Promise.all(cssRequire.map(this.convertCssToJS))
    let css = cssRequire.map(p => `@import "${p.replace('tmp/', 'src/')}";`).join('\n')

    css = await this.preprocessCss(css);
    css = css.css.toString()

    const name = path.replace('./tmp/pages/', '').replace('.js', '')

    try {
      html = ReactDOMServer.renderToStaticMarkup(<Template {...{
        stylesheets: [`./${name}.css`],
        ...(Page.config || {})
      }}><Page/></Template>)
    } catch (e) {
      console.error(e)
      return
    }

    await fs.ensureDir('./dist')
    await fs.writeFile(`./dist/${name}.html`, html)
    await fs.writeFile(`./dist/${name}.css`, css)

    this.log('Build', `Completed building page ${name} in ${Date.now() - this.startTime}ms!`)
    this.log('Browser', `Updating browser(s)`)
    this.browserSync.reload(['*.html', '*.css'])
  }

  async preprocessCss(css){
    return new Promise((resolve, reject) => {
      sass.render({data: css}, (err, result) => {
          if(err) { console.error(err); reject(err) }
          else { resolve(result) }
      })
    })
  }

}

export default new Builder()
