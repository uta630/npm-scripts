#!/bin/sh

## init
npm init -y

# gulp
npm i -D gulp gulp-sass gulp-postcss gulp-merge-media-queries gulp-sass-glob
# gulpを止めない！
npm i -D gulp-notify gulp-plumber
# CSSツール
npm i -D autoprefixer css-declaration-sorter gulp-stylelint stylelint
# create min file
nmp i -D gulp-clean-css gulp-rename

# scss/css importer
npm i -D node-sass-package-importer
# charset
npm i -D gulp-header

# browsing
npm i -D browser-sync



## reference
# https://haniwaman.com/gulp-sass/
# https://qiita.com/irok/items/08a4a015c24a7a83510f