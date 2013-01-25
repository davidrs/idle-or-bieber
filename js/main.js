var numberRemaining = 0;
var bestScore = 0;
var score = 0;
var attempts = 0;
var allowInput = true;
var playerName = "z";
var appID = -12;

var filterWords = [ "Justin Bieber", "idle no more", "#idlenomore", "justin",
		"bieber" ];
var twitterSearchTerms = [ 'Justin Bieber', '#idlenomore' ];

function startApp() {

	playerName = window.localStorage.getItem("playerName");
	console.log('name: ' + playerName);

	bestScore = window.localStorage.getItem("bestScore");
	var nameChange = $('#nameChange');

	if (page == 'play') {

		playSplashIntro();
		
		// remove or show name entry form
		if (playerName !== null) {
			nameChange.remove();
		} else {
			nameChange.removeClass('hide');
		}
		
		getTweets(twitterSearchTerms[0], 'jb');
		getTweets(twitterSearchTerms[1], 'idle');
		
	} else if (page == 'scores') {
		$('#name').val(playerName);

		getScores();
	} else if (page == 'about') {

	}

	// ==============================
	// UI and button code ============
	// ==============================

	// User name code
	$('#submit').click(function() {
		playerName = $('#name').val();
		console.log("playerName=" + playerName);
		if (page == 'play') {
			$('#nameChange').remove();
		}
		window.localStorage.setItem("playerName", playerName);

	});

	$('#bieber').click(function() {
		if (allowInput) {
			allowInput = false;
			$('.btn').css('opacity', '0.4');
			if ($('.tweet:nth-child(1)').hasClass('jb')) {
				score++;
			}
			showNextTweet();
		}
	});

	$('#idle').click(function() {
		if (allowInput) {
			allowInput = false;
			$('.btn').css('opacity', '0.4');
			if ($('.tweet:nth-child(1)').hasClass('idle')) {
				score++;
			}
			showNextTweet();
		}
	});

	$('#buttons div').hover(function() { // mouseover
		$(this).siblings().fadeTo('fast', 0.5);
	}, function() { // mouseout
		$(this).siblings().fadeTo('fast', 1.0);
	});

}

function playSplashIntro() {
	$('body').prepend('<div id="splash"></div>');
	$('#splash').delay(500).animate({
		opacity : 0.0
	}, 2000, "swing").animate({
		width : "0px",
		height : "0px"

	}, 1400, "swing", function() {
		$(this).remove();
	});

}
