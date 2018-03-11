const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

/* Compile Jade/Pug */
gulp.task('views', () => {
  return gulp.src(['src/views/*.pug'])
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());
});

/* Compile SASS */
gulp.task('sass', () => {
  return gulp.src(['src/scss/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.stream());
});

/* Watch changes on JavaScript files */
gulp.task('js', () => {
  return gulp.src([
    'src/scripts/*.js'
  ])
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(browserSync.stream());
});

/* Changes on static folder */
gulp.task('static', () => {
  return gulp.src(['src/static/*.*'])
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());
});

/* Sync browser */
gulp.task('serve', ['sass'], () => {
  browserSync.init({server: './dist'});

  // Watch for changes in pug and sass files
  gulp.watch(['src/scss/*.scss'], ['sass']);
  gulp.watch(['src/views/*.pug', 'src/views/includes/*.pug'], ['views']);

});

gulp.task('default', ['views', 'js', 'serve', 'sass', 'static'])
