var React = require('react')

module.exports = ({ confirmation, which_text, which_delete }) =>
  <button
    className={'small-button ' + (confirmation ? 'red' : '') }
    onClick={which_delete()}
  >
    <div className={confirmation ? 'red' : 'grey'}>
      {which_text()}
    </div>
  </button>
