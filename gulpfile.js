/*
 * plugin
 */
// require : settings
const { src, dest, watch, parallel, series } = require('gulp')
const packageImporter = require('node-sass-package-importer');
const $ = require('gulp-load-plugins')();

// require : scss
const autoprefixer = require('autoprefixer');
const cssdeclsort = require('css-declaration-sorter');

// require : js
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

// require : images
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');

// require : ローカルサーバー
const browserSync = require('browser-sync').create();

/*
 * env
 */
const minimist = require('minimist');
const envOption = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development', // NODE_ENVに指定がなければ開発モードをデフォルトにする
  }
};
const options = minimist(process.argv.slice(2), envOption);
const isProduction = (options.env === 'production') ? true : false;
console.log('[build env]', options.env, '[is production]', isProduction);

const argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

/*
 * config
 */
const config = {
  development: { // 開発用
    root: 'dist',
    path: {
      absolute: 'http://localhost:3000',
      relative: '/',
    }
  },
  production : { // 公開用
    root: 'prod',
    path: {
      absolute: 'https://www.example.com',
      relative: '/',
    }
  }
};

/*
 * tasks
 */
const TASK__scss = () => {
  return src( './src/scss/style.scss' )
    .pipe( $.plumber({ errorHandler: $.notify.onError( 'Error: <%= error.message %>' ) }) )
    .pipe( $.sassGlob() )
    .pipe( $.sass({
      outputStyle: 'expanded',
      importer: packageImporter({
          extensions: ['.scss', '.css']
      }),
      includePaths: require('node-reset-scss').includePath
    }) )
    .pipe( $.postcss([ autoprefixer() ]) )
    .pipe( $.postcss([ cssdeclsort({ order: 'alphabetically' }) ]) )
    .pipe( $.mergeMediaQueries() )
    .pipe( dest( `${config[options.env].root}/css` ) );
};

const TASK__css = () => {
  return src(`./${config[options.env].root}/css/style.css`)
    .pipe( $.header('@charset "utf-8";\n') )
    .pipe( $.cleanCss() )
    .pipe( $.rename({ extname: '.min.css' }) )
    .pipe( dest( `${config[options.env].root}/css` ) );
};

const TASK__ejs = () => {
  return src('./src/ejs/**/[^_]*.ejs')
    .pipe($.plumber({
        handleError: (err) => {
            this.emit('end');
        }
    }))
    .pipe($.data(file => {
      const path = config[options.env].path
      return { path }
    }))
    .pipe($.ejs())
    .pipe($.rename({extname: '.html'}))
    .pipe(dest(`./${config[options.env].root}`));
};

const TASK__imagemin = () => {
  return src('src/images/*.{jpg,jpeg,png,gif,svg}')
    .pipe($.imagemin([
      pngquant({
        quality: [.65, .85],
        speed: 1
      }),
      mozjpeg({
        quality: 85,
        progressive: true
      })
    ]))
    .pipe(dest(`${config[options.env].root}/images`));
};

const TASK__webpack = () => {
  return webpackStream({
    entry: './src/js/script.js',
      output: {
        filename: 'script.js'
      }
    }, webpack)
    .pipe($.babel())
    .pipe(dest(`${config[options.env].root}/js`));
};
const TASK__minjs = () => {
  return src(`${config[options.env].root}/js/script.js`)
    .pipe($.uglify())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(dest(`${config[options.env].root}/js/`));
};
const TASK__json = () => {
  return src('./src/data/**/*.json')
    .pipe($.jsonminify())
    .pipe(dest(`${config[options.env].root}/data/`));
};

/*
 * browserSync
 */
const browserSyncOption = {
  server: {
    baseDir: config[options.env].root
  },
  reloadOnRestart: true
};
const sync = done => {
  browserSync.init(browserSyncOption);
  done();
}
const watchFiles = done => {
  const browserReload = () => {
    browserSync.reload();
    done();
  };
  watch('src/scss/**/*.scss').on('change', series(TASK__scss, TASK__css, TASK__imagemin, browserReload));
  watch('src/ejs/**/*.ejs').on('change', series(TASK__ejs, TASK__imagemin, browserReload));
  watch('src/js/**/*.js').on('change', series(TASK__webpack, TASK__minjs, TASK__imagemin, browserReload));
  watch('src/data/**/*.json').on('change', series(TASK__json, browserReload));
}

/*
 * scripts
 */
exports.default = series(
  TASK__scss, TASK__css,
  TASK__ejs,
  TASK__webpack, TASK__minjs,
  TASK__json, TASK__imagemin,
);
exports.watch = series(
  TASK__scss, TASK__css,
  TASK__ejs,
  TASK__webpack, TASK__minjs,
  TASK__json, TASK__imagemin,
  sync, watchFiles
);
