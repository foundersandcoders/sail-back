/**
* MembershipTypes.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  migrate: 'alter',
  attributes: {
    description: {
      type: 'STRING'
    },
    value: {
      type: 'STRING',
      primaryKey: true
    },
    amount: {
      type: 'FLOAT'
    },
    members: {
      collection: 'Members',
      via: 'membership_type'
    }
  }
}
