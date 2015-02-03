var gulp = require('gulp'),
  mocha = require('gulp-mocha');

gulp.task('test', ['jshint'], function() {
  return gulp.src(['./test/*.js'], {
      read: false
    })
    .pipe(mocha({
      reporter: 'nyan'
    }));
});
