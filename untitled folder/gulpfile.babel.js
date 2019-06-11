import { src, dest, parallel, watch } from 'gulp'
import pug from 'gulp-pug'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import liveReload from 'gulp-server-livereload'

const html = () => {
  return src('./src/**/*.pug')
    .pipe(pug())
    .pipe(dest('docs'))
}

const css = () => {
  return src('./src/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest('docs'))
}

const server = () => {
  return src('./docs')
    .pipe(liveReload({
      livereload: true,
      open: true,
    }))
}

const watchFiles = (done) => {
  watch('./src/**/*.pug', pug)
  watch('./src/**/*.scss', css)
  done()
}

export default parallel(html, css, server, watchFiles)
