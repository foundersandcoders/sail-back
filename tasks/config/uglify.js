/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function (grunt) {
  grunt.config.set('uglify', {
    dist: {
      src: ['.tmp/public/js/app.js'],
      dest: '.tmp/public/app.min.js'
    }
  })

  grunt.loadNpmTasks('grunt-contrib-uglify')
}
