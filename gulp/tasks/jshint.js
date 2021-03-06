var gulp = require('gulp'),
  jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  return gulp.src([
      './src/*.js',
      './test/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
