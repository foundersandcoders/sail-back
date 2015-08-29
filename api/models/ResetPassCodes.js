// Reset password codes

module.exports = {
  attributes: {
    code: {
      type: 'STRING'
    },
    member: {
      model: 'Members'
    },
    valid: {
      type: 'BOOLEAN',
      defaultsTo: true
    },
    expire_date: {
      type: 'DATE'
    }
  }
}
