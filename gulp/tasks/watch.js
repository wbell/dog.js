var gulp = require('gulp');

gulp.task('watch', ['jshint'], function() {

  return gulp.watch([
    './src/*.js',
    './test/*.js'
  ], ['jshint']);

});
