/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  $('form').submit((event) => {
    console.log('event:', event);
    event.preventDefault();
  })

  
  const createTweetElement = function(data) {
    const $returnTweet = $("<article>").addClass("tweet");
    const name = data.user.name;
    const handle = data.user.handle;
    const content = data.content.text;
    $returnTweet.append(`
    <header>${name}<span>${handle}</span></header>
    <span>${content}</span>
    <hr>
    <footer>${data["created_at"]}</footer>
    `)
    return $returnTweet;
  }
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').append($tweet);
    }
  }
  
  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET'})
    .then((tweets) => {
      renderTweets(tweets);
    })
  }

  loadTweets();
});