var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Note = React.createClass({
	render: function(){
		return(
			<div>
				A note
			</div>
		);
	}
});

module.exports = Note;