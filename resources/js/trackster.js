
var Trackster = {};
const API_KEY = 'ffee6b1877afa54f2573fa0fbcdeb3f0';

$(document).ready(function(){

	/*
	  Given an array of track data, create the HTML for a Bootstrap row for each.
	  Append each "row" to the container in the body to display all tracks. 
	*/

	Trackster.renderTracks = function(tracks) { 

		$('.results').empty();

		for (var i = 0; i < tracks.length; i++) {

			var htmlTrackRow = 

			  	'<div class="result container-fluid" id="song">' +

			    '<div class="play col-xs-1 col-xs-offset-1">' +
			      '<a href="'+ tracks[i].url + '"><i class="fa fa-play-circle-o fa-2x"></i></a>' + 
			    '</div>' +

			    '<div class="title col-xs-4">' +
			      '<span>' + tracks[i].name + '</span>' +
			    '</div>' +

			    '<div class="artist col-xs-2">' +
			      '<span>' + tracks[i].artist + '</span>' +
 			    '</div>' +

			    '<div class="album col-xs-2">' +
			      '<img src="' + tracks[i].image[1]['#text'] + '">' +
			    '</div>' +

			    '<div class="popularity col-xs-2">' +
			      '<span>' + tracks[i].listeners + '</span>' +
			    '</div>' +
			    
			  '</div>';

			  $('.results').append(htmlTrackRow);

			}} 

		/*
	  Given a search term as a string, query the LastFM API.
	  Render the tracks given in the API query response.
	*/

 	Trackster.searchTracksByTitle = function(title) {
 		console.log(title);
		var requestURL = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json';
		$.ajax( {url:requestURL, success: function(result) { 
			console.log(result);
			Trackster.renderTracks(result.results.trackmatches.track);
		} })
	};
 
/*********** Button Click Functionality ***********/

	$('#button').click(function() {	
 		Trackster.searchTracksByTitle( $('input').val())
 	});

/*********** Button Enter Functionality ***********/

	$('input').keypress(function(e) {
    if(e.which == 13) {
        Trackster.searchTracksByTitle($('input').val())
    }
  });

})
