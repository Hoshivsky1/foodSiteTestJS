'use strict';

let path = require('path');

module.exports = {
  mode: 'development', //!режим в якому буде працювати вебпак
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
