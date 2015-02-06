var gulp = require('gulp'),
  istanbul = require('gulp-istanbul'),
  mocha = require('gulp-mocha');

gulp.task('test', ['jshint'], function callmecallback(cb) {

  gulp.src(['./src/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function finish() {
      gulp.src(['./test/*.test.js'], {
          read: false
        })
        .pipe(mocha({
          reporter: process.env.CI ? 'spec' : 'nyan'
        }))
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});
