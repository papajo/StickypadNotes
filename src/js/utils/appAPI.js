var AppActions = require('../actions/AppActions');

module.exports = {
	addNote: function(note) {
		$.ajax({
			url: "https://api.mongolab.com/api/1/databases/stickypad/collections/notes?apiKey=Z9A_g8DPNH2rcv8lhnzzcGjN-uGGs1nU",
			data: JSON.stringify(note),
			type: "POST",
			contentType: "application/json"
		})
	},
	getNotes: function() {
		$.ajax({
			url: "https://api.mongolab.com/api/1/databases/stickypad/collections/notes?apiKey=Z9A_g8DPNH2rcv8lhnzzcGjN-uGGs1nU",
			dataType: 'json',
			cache: false,
			success: function(data){
				AppActions.receiveNotes(data);
			}.bind(this),
			error: function(xhr,status,err) {
				console.log(err);
			}.bind(this)
		})
	},
    removeNote: function(noteId) {
        $.ajax({
			url: "https://api.mongolab.com/api/1/databases/stickypad/collections/notes/"+noteId+"?apiKey=Z9A_g8DPNH2rcv8lhnzzcGjN-uGGs1nU",
			type: "DELETE",
			async: true,
            timeout: 300000,
            success: function(data){
                console.log("Note Deleted...");
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }.bind(this)
		})
    }
	
}