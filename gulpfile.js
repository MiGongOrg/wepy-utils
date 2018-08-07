var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('default', function () {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('lib'))
});