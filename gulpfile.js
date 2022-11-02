const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var uglifycss = require('gulp-uglifycss');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;


gulp.task('compress', function () {
    return pipeline(
          gulp.src('lib/*.js'),
          uglify(),
          gulp.dest('dist')
    );
  });

gulp.task('default', function () {
    gulp.src('src/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

function buildStyles() {
    return gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
  };
  
  exports.buildStyles = buildStyles;
  exports.watch = function () {
    gulp.watch('./sass/*.scss', ['sass']);
  };

gulp.task('uglify', function() {
    gulp.src('./styles/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./dist/'));
});

