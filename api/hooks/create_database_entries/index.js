/*global
  Members
*/

'use strict'

var createEntries = require('./createEntries.js')

/* istanbul ignore next */
module.exports = function (sails) {
  return {
    configure: function () {
      /**
      *   'return sails.after' is part of timing
      *   on when our hook is runned.
      *   In this case we wait for the orm loaded.
      *   For more info check sails.js docs on github:
      *   sails-docs/concepts/extending-sails/Hooks/customhooks.md
      **/

      // sails.log.info("Mocks: ", mocks)

      return sails.after('hook:orm:loaded', function () {
        Members
          .find({limit: 10})
          .exec(function (err, items) {
            sails.log.info('Look for members...')

            if (items && items.length > 0) {
              sails.log.info('...members already there!')
            } else {
              createEntries(function (err, results) {
                if (err) {
                  sails.log.error('Hooks - error', err)
                } else {
                  sails.log.info('Hooks - database entries completed!')
                }
              })
            }
          })
      })
    }
  }
}
