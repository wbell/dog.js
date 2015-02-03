var gulp = require('gulp'),
  docco = require('gulp-docco');

gulp.task('docco', ['test'], function() {
  gulp.src("./src/*.js")
    .pipe(docco())
    .pipe(gulp.dest('./dist/docs'));
});
