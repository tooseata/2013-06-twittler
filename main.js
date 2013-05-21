$(document).ready(function(){

 var $body = $('#container');
 $body.html('');
 var bool = $('#controls #moretweets').text();

  var loadTweet =  function(){
    var currentDate = new Date();
    var counter = 0;
    var dateFormat = function (post_time, current_time) {
      var seconds = (current_time - post_time)/1000;
      if (seconds < 60) {
            return "less than a minute ago";
        }
      if (seconds >= 60 && seconds < 120) {
            return Math.round(seconds/60) + " minute ago";
        }
      if (seconds >= 60 && seconds < 3600) {
            return Math.round(seconds/60) + " minutes ago";
        }
      if (seconds >= 3600 && seconds < 7200) {
            return "1 hour agizzle";
        }
      if (seconds >= 7200 && seconds < 86400) {
            return "1 hour agizzle";
        } else {
            return Math.round(seconds/86400) + " days ago";
        }

      };

    return {
        getCounter : function() { return counter;},
        increment : function(inc) {
          counter += inc;
            var tweet, postUser, postDate, postMessage;
              for (var i = counter - inc; i <= counter - 1; i++){
                tweet = window.streams.home[i];
                postUser = tweet.user;
                postDate = tweet.created_at;
                postMessage = tweet.message;
                var $tweet = $('<article class="tweet"></article>');
                $tweet.append("<a href='#' class='userLink'><img id='userimg' src='http://placehold.it/150x150'/>" + "<div id='postuser'>" + postUser + "</div>" + "</a>" +
                "<div id='postmessage'>" + postMessage + "</div>" + "<div id='posttime'>" + dateFormat(postDate,currentDate) + "</div>"
                  );
                $tweet.appendTo($body);
              }

        }

    };

  }();

  //Load 10 tweets on page load. 
  loadTweet.increment(5);
  $('#controls .tweets_on_page').text(loadTweet.getCounter() + " tweets on display! ");

  $('#controls').on('click', '#moretweets', function(e){
  e.preventDefault();
  bool = $('#controls #moretweets').text();
   if (bool === "Go Back"){
      $body.html('');
      $('#controls #moretweets').text("Load +5 tweets");
    }
    loadTweet.increment(5);
    $('#controls .tweets_on_page').text(loadTweet.getCounter() + " tweets on display! ");
  });

  // Event handler for users timelines
  $('#container').on('click', '.tweet a', function(e) {
    e.preventDefault();
    $('#container').html('');
    var user = $(this).text().toString();
    var UserTweets = streams.users[user];
    for (var i = UserTweets.length - 1; i >= 0; i--) {
            var user_clicked = UserTweets[i];
            postUser = user_clicked.user;
            postDate = user_clicked.created_at;
            postMessage = user_clicked.message;
            var $tweet = $('<article class="tweet"></article>');
            $tweet.append("<a href='#' class='userLink'><img id='userimg' src='http://placehold.it/150x150'/>" + "<div id='postuser'>" + postUser + "</div>" + "</a>" +
                "<div id='postmessage'>" + postMessage + "</div>"
                  );
            $tweet.appendTo($body);
    }
    $('#controls #moretweets').text("Go Back");
    $('#controls .tweets_on_page').text( UserTweets.length + " of " + postUser + "'s" + " tweets on display! ");
    return false;
  });


});