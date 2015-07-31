/**
 * Browserfiy all the js files.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to Browserfiy all the js files in angularApp.
 *
 * For usage docs see:
 *    http://browserify.org/articles.html
 */
module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      js: {
        // A single entry point for our app
        src: ['assets/js/vdom/app.js'],
        // Compile to a single file to add a script tag for in your HTML
        dest: '.tmp/public/js/bundle.js',
      },
      options: {
        browserifyOptions: {
          debug: true
        }
      }
    },
  })

  // Load the npm installed tasks
  grunt.loadNpmTasks('grunt-browserify')
}
