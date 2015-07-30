'use strict'


var h = require('virtual-dom/h')


module.exports.index = function (utils, state) {
  
  var that = {}

  that.render = function () {

    return module.exports.view(state, createUploader, receiveUploader)
  }

  /**
   *	Takes a type of entries ('members' or 'payments')
   *	and returns a callback with an object which has:
   *
   *	{
   *		type: 'member' or 'payments'
   *		result: {In a string format}
   *	}
   *
   *	@param {String}   - type of upload {'member' || 'payments'}
   *	@param {Function} - callback with the result object
   *	
   */
  function createUploader (type, callback) {

    return function upload () {

      var reader = new FileReader
      var result

      reader.addEventListener('load', function (e) {
	result = e.target.result
	callback({type: type, result: result})
      })
      reader.readAsText(this.files[0])
    }
  }

  /**
   *	Check duplicates by 'primary_email' in members.
   *	
   *	@param  {Array} - array of members object
   *	@return {Array} - array of duplicate members if any
   */
  function checkDuplicates (entries) {
    
    var emailsArray = utils.lazy(entries)
        .pluck('primary_email')
        .sort()
        .filter(function (elm) {
          
          if(elm) {
            return elm
          }
        })
        .toArray()

    var dups = utils.lazy(emailsArray)
        .reduce(function (aggregator, currentValue, index, array) {
          
          if(currentValue === emailsArray[index-1]) {
            aggregator.push(currentValue)
          }
          return aggregator
        }, [])
    
    return utils.lazy(entries).filter(function (entry) {
      return (dups.indexOf(entry.primary_email) > -1)
    }).toArray()
  }

  /**
   *	Parser function which uses 'parseCsv'.
   *	Updates the state with members or payments
   *	array.
   */
  function receiveUploader (file) {

    utils.parseCsv(file, function (err, fileAsJson) {
      
      if (file.type === 'members') {
        var duplicates = checkDuplicates(fileAsJson)
        var uniqueMembers = utils.lazy(fileAsJson).filter(function (member) {
          return (duplicates.indexOf(member) === -1)
        }).toArray()
        
        state.upload.members.set(uniqueMembers)
        state.upload.memberDuplicates.set(duplicates)
        state.panel.set('members')
      } else {

        state.upload.payments.set(fileAsJson)
        state.upload.paymentCount.set(fileAsJson.length)
        state.panel.set('payments')
      }
    })
  }

  var uploadDone = {done: false, status: ''}

  return that
}


module.exports.view = function (state, createUploader, receiveUploader) {

  return (
    h('div.upload-component', [
      h('div.upload#upload-container', [
	h('div.file-upload', [
	  h('span', 'Upload members'),
	  h('input#upload-members.upload', {
	    type: 'file',
	    onchange: createUploader('members', receiveUploader)
	  })
	]),
	h('div.file-upload', [
	  h('span', 'Upload payments'),
	  h('input#upload-payments.upload', {
	    type: 'file',
	    onchange: createUploader('payments', receiveUploader)
	  })
	]),
      ]),
      renderResult(state)
    ])
  )

  function renderResult (state) {

    if(state.status().done) {
      if(status.status.split(' ')[0] === 'Done'){
	return (
	  h('div.result-upload', [
	    h('p', 'Upload succesful')
	  ])
	)
      } else {
	return (
	  h('div.result-upload', [
	    h('p', state)
	  ])
	)
      }
    }
  }
}
