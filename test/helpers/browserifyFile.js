'use strict';

var browserify = require('browserify');

module.exports = browserifyFile;

function browserifyFile (file, callback) {

    var bundleFile = browserify(file).bundle();

    var store = '';

    bundleFile.on('data', function (data) {

        store += data;
    });

    bundleFile.on('end', function () {

        callback(null, store);
    });
}
