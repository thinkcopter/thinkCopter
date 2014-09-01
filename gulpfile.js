var gulp = require('gulp'),
browserify = require('gulp-browserify'),
jshint = require('gulp-jshint'),
jshintStylish = require("jshint-stylish");


gulp.task("jshint", function() {
  return gulp.src([ "./public/*.js"])
  .pipe(jshint())
  .pipe(jshint.reporter(jshintStylish));
});

gulp.task('browserify', function() {
  return gulp.src(["./public/*.js"])
  .pipe(browserify({ debug : true, "fullPaths": true }))
  .pipe(gulp.dest('./public/build'));
});


gulp.task('build', ['jshint', 'browserify']);

gulp.task('default', ['build']);
