const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

/* Compile SASS */
gulp.task('sass', () => {
  return gulp.src([
      'node_modules/bootstrap/scss/bootstrap.scss',
      'src/scss/*.scss'
    ])
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(browserSync.stream());
});

/* Watch changes on JavaScript files */
gulp.task('js', () => {
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'src/scripts/*.js'
  ])
  .pipe(gulp.dest('public/assets/js'))
  .pipe(browserSync.stream());
});

/* Sync browser */
gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './public'
  });

  gulp.watch([
    'node_modules/bootstrap/scss/bootstrap.min.scss',
    'src/scss/*.scss'
  ], ['sass']);

  gulp.watch('public/*.html').on('change', browserSync.reload);

});

// Font awesome
gulp.task('fa', () => {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('public/assets/css'));
})
// Font awesome fonts
gulp.task('fonts', () => {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/assets/fonts'));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts'])
