'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');

gulp.task('css', function () {
  console.log('Compiling css');
  return gulp.src('./src/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass', function () {
  console.log('Recompiling sass');
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('build', ['sass', 'css']);
gulp.task('default', ['sass']);

console.log('Starting development mode');
