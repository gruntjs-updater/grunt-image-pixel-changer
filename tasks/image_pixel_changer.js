/*
 * grunt-image-pixel-changer
 * https://github.com/suenkating/grunt-image-pixel-changer
 *
 * Copyright (c) 2014 ssac
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var fs    = require('fs');
  var PNG   = require('pngjs').PNG;
  var path  = require('path');
  var async = require('async');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('image_pixel_changer', 'Crawl all image pixels and convert specified rgba value to another value.', function() {

    var task    = this;
    var done    = this.async();
    var series  = [];
    var options = task.options();

    // Iterate over all specified file groups.
    this.files.forEach( function (f) {

      var srcPath = f.src[0];

      if (!grunt.file.exists(srcPath)) {
        grunt.log.warn('Source file "' + srcPath + '" not found.');
        return;
      }

      var destPath = f.dest;
      var srcExt = path.extname(srcPath).toLowerCase();

      series.push( function (callback) {

        if (srcExt !== '.png') {
          return grunt.log.warn('Currently only support png format.');
        }

        fs.createReadStream(srcPath)
          .pipe( new PNG({
            filterType: 4
          }))
          .on('parsed', function () {

            for (var idx = 0; idx < this.data.length; idx = idx + 4) {
              var isConverted = false;

              for (var optidx in options) {
                if (isConverted) { break; }

                var opt = options[optidx];

                if ((!('r1' in opt) || ('r1' in opt && this.data[idx] === opt['r1'])) &&
                  (!('g1' in opt) || ('g1' in opt && this.data[idx+1] === opt['g1'])) &&
                  (!('b1' in opt) || ('b1' in opt && this.data[idx+2] === opt['b1'])) &&
                  (!('a1' in opt) || ('a1' in opt && this.data[idx+3] === opt['a1']))) {

                  isConverted = true;

                  if ('r2' in opt) {
                    this.data[idx] = opt['r2'];
                  }

                  if ('g2' in opt) {
                    this.data[idx+1] = opt['g2'];
                  }

                  if ('b2' in opt) {
                    this.data[idx+2] = opt['b2'];
                  }

                  if ('a2' in opt) {
                    this.data[idx+3] = opt['a2'];
                  }
                }
              }

            }

            this.pack().pipe(
              fs.createWriteStream(destPath)
            ).on('finish', function () {
              // Print a success message.
              grunt.log.writeln('File "' + destPath + '" created.');
              callback();
            }).on('error', function () {
              grunt.log.warn('File "' + destPath + '" error.');
            });

          }
        );

      });

    });

    async.series(series, done);

  });
};
