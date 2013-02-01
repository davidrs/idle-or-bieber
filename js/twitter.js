function showNextTweet(){
	attempts++;

	if(score>bestScore){
		updateHighscore();
	}

	 $('#score').html('Score: '+score+' / '+attempts);
	 $('.tweet:nth-child(1)').hide("slow", function(){
												$(this).remove();
												$('.tweet:nth-child(1)').show("slow", function(){
													allowInput=true;
													$('.btn').css('opacity','1');
													});
												});	 
}

function updateHighscore(){
	bestScore=score;		
	window.localStorage.setItem("bestScore", bestScore);
	submitScore(playerName,bestScore);
}


function getTweets(queryText, className){
	var params = {
            q: queryText,
            rpp: 15,
			lang: 'en'
        };
		numberRemaining++;
        searchTwitter(params,className);	
}



function searchTwitter(query, className) {
	//create regEx for removing keywords:		
	var rgx = new RegExp(filterWords.join("|"), "gi");


    $.ajax({
        url: 'http://search.twitter.com/search.json?' + jQuery.param(query),
        dataType: 'jsonp',
        success: function(data) {
            var tweets = $('#tweets');
            //tweets.html('');
            for (res in data['results']) {
				var tweetText=data['results'][res]['text'].replace(rgx," ____________ ");
				tweetText=tweetText.parseURL();				
                tweets.append('<div class="tweet '+className+'"> <p>' + tweetText + '</p></div><br />');
			}
			numberRemaining--;
			if(numberRemaining==0){
					shuffleTweets($('.tweet'));  
			}
        }
    });
}



function shuffleTweets(tweetDivs){     // pass the collection of divs to the function
    var replace = $('<div>');
    var size = tweetDivs.size();

    while (size >= 1) {
       var rand = Math.floor(Math.random() * size);
       var temp = tweetDivs.get(rand);      // grab a random div from our set
       replace.append(temp);        // add the selected div to our new set
       tweetDivs = tweetDivs.not(temp); // remove our selected div from the main set
       size--;
    }
    $('#tweets').html(replace.html() );     // update our container div with the
                                             // new, randomized divs
	hideAllButFirstTweet();
}


function hideAllButFirstTweet(){
	$('.tweet:not(:first-child)').hide();
}

//create string function to make links clickable			
String.prototype.parseURL = function() {
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
		return url.link(url);
	});
};
