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
    .src( './src/scss/style.scss' )
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
    .pipe( header('@charset "utf-8";\n') )
    .pipe( cleanCSS() )
    .pipe( rename({ extname: '.min.css' }) )
    .pipe( gulp.dest( 'dist/css' ) );
});

// ローカルサーバーの立ち上げ
// https://teratail.com/questions/168814
const browserSyncOption = {
  server: {
    baseDir: './dist/'
  },
  reloadOnRestart: true
};

function sync(done) {
  browserSync.init(browserSyncOption);
  done();
}

// watch&リロード 処理
function watchFiles(done) {
  const browserReload = () => {
    browserSync.reload();
    done();
  };
  gulp.watch('src/scss/**/*.scss').on('change', gulp.series('scss', 'css', browserReload));
}

gulp.task('default', gulp.series('scss', 'css', sync, watchFiles));