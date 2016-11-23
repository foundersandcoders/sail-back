var React = require('react')

module.exports = ({ confirmation, which_text, which_delete }) =>
  <div className={confirmation ? 'red' : 'grey'}>
    <button
      className={'small-button ' + (confirmation ? 'red' : '') }
      onClick={which_delete()}
    >
      {which_text()}
    </button>
  </div>
