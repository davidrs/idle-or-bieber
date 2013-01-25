//jsonp is the REQUIRED datatype if the php files are hosted on a different server.

function getScores() {
	console.log("get scores");

	$.ajax({
		url : '../php/getScores.php?uid=' + appID,
		dataType : 'jsonp',
		success : function(data) {
			$('#scores').html(data['val']);
			console.log("got scores");
		}
	});
}

function submitScore(name, score) {
	var $submitURL = '../php/submitScore.php?uid=' + appID + '&name=' + name
			+ '&score=' + score;

	console.log('submit scores to: ' + $submitURL);

	$.ajax({
		url : ($submitURL),
		dataType : 'jsonp',
		success : function(data) {
			console.log("success ajax submit");
		}
	});

}