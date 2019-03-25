// require : settings
const gulp = require('gulp');
const packageImporter = require('node-sass-package-importer');

// require : scss
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('autoprefixer');
const cssdeclsort = require('css-declaration-sorter');
const mmq = require('gulp-merge-media-queries');
const postcss = require('gulp-postcss');

// require : css
const gulpStylelint = require('gulp-stylelint');
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

// require : watch
const browserSync = require('browser-sync').create();

// task : scss
gulp.task('scss', function() {
  return gulp
    .src( './scss/style.scss' )
    .pipe( plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) }) )
    .pipe( sassGlob() )
    .pipe( sass({
      outputStyle: 'expanded',
      importer: packageImporter({
          extensions: ['.scss', '.css']
      }),
      includePaths: require('node-reset-scss').includePath
    }) )
    .pipe( postcss([ autoprefixer() ]) )
    .pipe( postcss([ cssdeclsort({ order: 'alphabetically' }) ]) )
    .pipe( mmq() )
    .pipe( gulp.dest( 'dist/css' ) );
});

// task : css
gulp.task('css', function(){
  return gulp
    .src( './dist/css/style.css' )
    // .pipe(
    //   gulpStylelint({
    //     fix: true
    //   })
    // )
    .pipe( header('@charset "utf-8";\n') )
    .pipe( cleanCSS() )
    .pipe( rename({ extname: '.min.css' }) )
    .pipe( gulp.dest( 'dist/css' ) );
});

// task : browser + auto reload
gulp.task('browser-sync', function() {
  return browserSync.init(null, {
    server: {
      baseDir: './dist'
    }
  });
});
gulp.task('bs-reload', function() {
  browserSync.reload();
});

// task : watch
gulp.task('watch', function(){
  return gulp
    .watch(
      'scss/**/*.scss',
        gulp.series('scss', 'css'),
    )
});

// task : default
gulp.task('default',
  gulp.series('scss', 'css', 'browser-sync'),
  function(){
    return gulp
    .watch(
      'scss/**/*.scss',
      gulp.series('scss', 'css', 'bs-reload'),
    )
  }
);
