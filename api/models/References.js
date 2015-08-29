/**
* References.js
*
* @description :: Reference number to insert with a payment.
*				  The primary key is the code itself since it
*				  must be unique anyway.
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    payments: {
      collection: 'Payments',
      via: 'reference'
    },
    code: {
      type: 'STRING',
      unique: true,
      primaryKey: true
    },
    description: {
      type: 'STRING'
    }
  }
}
