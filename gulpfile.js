const babel       = require('gulp-babel');
const browserSync = require('browser-sync');
const gulp        = require('gulp');
const prefix      = require('gulp-autoprefixer');
const pug         = require('gulp-pug');
const sass        = require('gulp-sass');

gulp.task('pug', function buildHTML() {
  return gulp.src('./src/pug/index.pug')
  .pipe(pug())
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({
        includePaths: ['scss'],
        onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', ['sass', 'pug'], function() {
  browserSync({
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('js', function() {
  return gulp.src('./src/js/main.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/javascript'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/pug/**/*.pug', ['pug']);
});

gulp.task('default', ['browser-sync', 'watch']);