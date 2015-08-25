/*global
  Events, sails
*/

var is = require('torf')
var Validation = require('../../src/js/services/validate.js')

module.exports = {
  book: function (req, res) {
    // Raw connection
    var mySqlPath = process.env.PWD + '/node_modules/sails-mysql/node_modules/mysql'
    var mysql = require(mySqlPath)
    var sailsMySqlConfig = module.exports._getConfigConnection(process.env.NODE_ENV)
    var mySqlConnection = module.exports._openConnection(mysql, sailsMySqlConfig)

    var sessionUser = req.session.user
    var eventItem = req.body.eventItem
    var eventId = eventItem.id
    var memberNum = parseInt(req.body.member, 10)
    var guestNum = parseInt(req.body.guest, 10)
    var totalPlaces = memberNum + guestNum
    var total = parseInt(req.body.total, 10)
    var charge = module.exports._createCharge(sessionUser, eventItem, total)
    var booking = module.exports._createBooking(sessionUser, eventItem, memberNum, guestNum)

    Validation('booking', booking, function (errBooking, valueBooking) {
      if (errBooking) {
        return res.badRequest({error: errBooking})
      }

      Validation('payment', charge, function (errCharge, valueCharge) {
        if (errCharge) {
          return res.badRequest({error: errCharge})
        }

        Events
          .findOne(eventId)
          .populate('booking_records')
          .exec(function (errorEvent, eventRecord) {
            if (errorEvent) {
              return res.serverError({error: errorEvent})
            } else if (!is.ok(eventRecord)) {
              return res.badRequest({error: 'Record not found'})
            } else {
              var placesBooked = module.exports._totalBooked(eventRecord.booking_records)

              if (eventRecord.total_places_available - placesBooked - totalPlaces < 0) {
                return res.badRequest({error: 'There are not enough places available'})
              }
            }

            mySqlConnection.beginTransaction(function (errStartTransaction) {
              if (errStartTransaction) {
                return module.exports._rollBack(errStartTransaction, mySqlConnection, res)
              }

              mySqlConnection.query('INSERT INTO payments SET ?', charge, function (errorCharge, itemCharge) {
                if (errorCharge) {
                  return module.exports._rollBack(errorCharge, mySqlConnection, res)
                }

                mySqlConnection.query('INSERT INTO bookingrecords SET ?', booking, function (errorBooking, itemBooking) {
                  if (errorBooking) {
                    return module.exports._rollBack(errorBooking, mySqlConnection, res)
                  }

                  mySqlConnection.commit(function (errCommit) {
                    if (errCommit) {
                      return module.exports._rollBack(errCommit, mySqlConnection, res)
                    }

                    sails.log.info('SUCCESS!')
                    return res.send(itemCharge)
                  })
                })
              })
            })
          })
      })
    })
  },
  _rollBack: function (originalError, mySqlConnection, response) {
    return mySqlConnection.rollback(function (errorRollback) {
      if (errorRollback) {
        sails.log.error('ERROR WHILE ROLLBACK', errorRollback)
        return res.serverError({error: errorRollback})
      }
      sails.log.error('ROLLBACK', originalError)
      return response.serverError({error: originalError})
    })
  },
  _totalBooked: function (records) {
    return records.reduce(function (aggregator, elm) {
      return aggregator + elm.number_of_members + elm.number_of_guests
    }, 0)
  },
  _createCharge: function (user, eventItem, total) {
    return {
      member: user.id,
      category: 'event',
      amount: total,
      description: 'Event "' + eventItem.title + '"',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  _createBooking: function (user, eventItem, memberNum, guestNum) {
    return {
      event_id: eventItem.id,
      head_member: user.id,
      number_of_members: memberNum,
      number_of_guests: guestNum,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  _getConfigConnection: function (NODE_ENV) {
    if (NODE_ENV === 'development' || NODE_ENV === 'testing') {
      return sails.config.connections.localMySql
    }
  },
  _openConnection: function (mySqlConnection, config) {
    return mySqlConnection.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      multipleStatements: true
    })
  }
}
