import React from 'react'
import ReactDOMServer from 'react-dom/server'
import glob from 'globby'
import chokidar from 'chokidar'
import path from 'path'
import fs from 'fs-extra'
import sass from 'node-sass'
import decache from 'decache'
import browserSync from 'browser-sync'

class Builder {
  browserSync = browserSync.create()

  constructor(){
    this.browserSync.init({
       server: "./dist"
    })
    this.run()
  }

  requireMap = {}

  async run(){
    await fs.ensureDir('./tmp')
    await fs.emptyDir('./tmp')
    await fs.copy('./src', './tmp')

    await fs.ensureDir('./dist')
    await fs.emptyDir('./dist')

    const cssFiles = await glob('./tmp/**/*.scss')
    await Promise.all(cssFiles.map(this.convertCssToJS))

    const jsFiles = await glob('./tmp/**/*.js', {
      ignore: ['./tmp/pages/**/*.js']
    })
    await Promise.all(jsFiles.map(this.attachRequireNotice))

    const pages = await glob('./tmp/pages/**/*.js')
    await Promise.all(pages.map(this.convertToStatic))

    // const srcWatcher = chokidar.watch('./src/**/*.*', { ignoreInitial: true })
    //   .on('add', this.copyToTmp)
    //   .on('change', this.copyToTmp)

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
    console.log('[pages js]', path);
    await this.copyToTmp(path)
    path = path.replace('src/', 'tmp/')
    await this.convertToStatic(path)
  }

  styleFileDidChange = async(path) => {
    console.log('css', path)
    await this.copyToTmp(path)
    path = path.replace('src/', 'tmp/')
    await this.convertCssToJS(path)
    const pages = await this.findRequireInPage('css', path)
    console.log('CONVERT', pages)
    pages.map(this.convertToStatic)
  }

  jsFileDidChange = async(path) => {
    console.log('js', path)
    await this.copyToTmp(path)
    path = path.replace('src/', 'tmp/')
    await this.attachRequireNotice(path)
    const pages = await this.findRequireInPage('js', path)
    pages.map(this.convertToStatic)
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
      if(this.requireMap[page][type].indexOf(`./${path}`) !== -1){
        found.push(page)
      }
    }
    return found
  }

  async copyToTmp(path){
    console.log('copy', path)
    const exits = await fs.pathExists(path)
    console.log('[copy] - ', path, ' exits?',exits);
    await fs.copy(path, path.replace('src/', 'tmp/'))
    console.log('copy done to', path.replace('src/', 'tmp/'))
  }

  convertCssToJS = async(path) => {
    path = path.replace('src/', 'tmp/')

    console.log('[css] - ', path);
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
    console.log('[PAGE]', path)

    try {
      if(path.substr(0,2) === './'){
        decache(`${path}`)
        Page = require(`${path}`)?.default
      }else{
        decache(`./${path}`)
        Page = require(`./${path}`)?.default
      }
    } catch (e) {
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

    try {
      html = ReactDOMServer.renderToStaticMarkup(<Page/>)
    } catch (e) {
      console.error(e)
      return
    }


    let name;
    if(path.substr(0, 2) === './'){
      name = path.replace('./tmp/pages/', '').replace('.js', '')
    } else {
      name = path.replace('tmp/pages/', '').replace('.js', '')
    }
    html = `<html><head><link rel='stylesheet' type='text/css' href='./${name}.css'/></head><body>${html}</body></html>`;

    await fs.ensureDir('./dist')
    await fs.writeFile(`./dist/${name}.html`, html)
    await fs.writeFile(`./dist/${name}.css`, css)

    // setTimeout(() => {
      this.browserSync.reload(['*.html', '*.css'])
    // }, 500)
    console.log('done',`./dist/${name}.html`)
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
