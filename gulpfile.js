const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const plumber = require('gulp-plumber')
const liveReload = require('gulp-server-livereload')

const paths = {
  src: {
    styles: './src/styles/*.scss',
    html: `./src/**/*.pug`,
  },
  public: {
    default: './public',
  },
  assets: './assets/**/*.*',
}

gulp.task('styles', () =>
  gulp
    .src(paths.src.styles)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(paths.public.default))
)

gulp.task('html', () =>
  gulp
    .src(paths.src.html)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(paths.public.default))
)

gulp.task('assets', () =>
  gulp
    .src(paths.assets)
    .pipe(gulp.dest(paths.public.default))
)

gulp.task('livereload', function() {
  gulp.src(paths.public.default)
    .pipe(liveReload({
      livereload: true,
      // directoryListing: true,
      open: true
    }))
})


gulp.task('styles:watch', () => gulp.watch(paths.src.styles, ['styles']))
gulp.task('html:watch', () => gulp.watch(paths.src.html, ['html']))
gulp.task('assets:watch', () => gulp.watch(paths.assets, ['assets']))

gulp.task('default', ['html', 'styles', 'assets', 'watch', 'livereload'])
gulp.task('watch', ['html:watch', 'styles:watch', 'assets:watch'])
