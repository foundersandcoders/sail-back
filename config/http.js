/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

var passport = require('passport')
var path = require('path')

module.exports.http = {
  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/


  customMiddleware: function (app) {
    app.use(passport.initialize())
    app.use(passport.session())
  },

  // broken dependency doesn't update the cookie timeout
  refreshSessionCookie: function (req, res, next) {
    req.session._garbage = Date()
    req.session.touch()
    return next()
  },

  middleware: {
    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP request. (the Sails *
    * router is invoked by the "router" middleware below.)                     *
    *                                                                          *
    ***************************************************************************/

    order: [
      'https',
      'startRequestTimer',
      'cookieParser',
      'session',
      'refreshSessionCookie',
      'myRequestLogger',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      'disablePoweredBy',
      '$custom',
      'router',
      'www',
      'assets',
      'favicon',
      '404',
      '500'
    ],

    https: function (req, res, next) {
      if (process.env.NODE_ENV !== 'heroku' || req.headers['x-forwarded-proto'] === 'https') return next()
      return res.redirect('https://' + req.headers.host + req.url)
    },
    /****************************************************************************
    *                                                                           *
    * Example custom middleware; logs each request to the console.              *
    *                                                                           *
    ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url)
    //     return next()
    // }

    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests. By    *
    * default as of v0.10, Sails uses                                          *
    * [skipper](http://github.com/balderdashy/skipper). See                    *
    * http://www.senchalabs.org/connect/multipart.html for other options.      *
    *                                                                          *
    ***************************************************************************/

    bodyParser: require('skipper')({ limit: '50mb' }),

    assets: require('serve-static')(path.dirname(__filename) + '/../assets')

  },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

cache: 0 
}
