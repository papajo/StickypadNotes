var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');

var CHANGE_EVENT = 'change';

var _notes = [];

var AppStore = assign({}, EventEmitter.prototype, {
	addNote: function(note) {
		_notes.push(note);
	},
	getNotes: function() {
		return _notes;
	},
	setNotes: function(notes) {
		 _notes = notes;
	},
    removeNote: function(noteId) {
		 var index = _notes.findIndex(x => x._id.$oid === noteId);
         _notes.splice(index, 1);
	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on('change', callback);
	},
	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType){
		case AppConstants.ADD_NOTE:
			console.log('Adding Note...');
			//Store Save
			AppStore.addNote(action.note)

			//API
			AppAPI.addNote(action.note)

			//Emit change
			AppStore.emit(CHANGE_EVENT);
            
            break;

		case AppConstants.RECEIVE_NOTES:
			console.log('Retrieving Notes...');
			//Store Save
			AppStore.setNotes(action.notes);

			//Emit change
			AppStore.emit(CHANGE_EVENT);
            
            break;
            
        case AppConstants.REMOVE_NOTE:
			console.log('Note removed...');
			//Store remove
			AppStore.removeNote(action.noteId);

			//API remove
			AppAPI.removeNote(action.noteId);
            
            //Emit change
			AppStore.emit(CHANGE_EVENT);
            
            break;
		
	}

	return true;
});

module.exports = AppStore;