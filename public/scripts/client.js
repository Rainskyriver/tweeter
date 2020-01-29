/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  $('form').submit(function(event) {
    event.preventDefault();
    const tweetText = ($(this).serialize());
    const $textarea = $('textarea')
    //above 140 characters
    if ($textarea.val().length > 140) {
      alert('TOO LONG Stop! You violated the law. Pay the court a fine or server your sentence. Your stolen goods are now forfeit.')
    }
    //empty text
    if ($textarea.val() === '') {
      alert('EMPTY Stop! You violated the law. Pay the court a fine or server your sentence. Your stolen goods are now forfeit.')
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: tweetText
    })
    .done(() => {
      $('#tweet-container').empty();
      loadTweets();
    })

    //clear and keep focus
    $textarea.val('').focus();
    //reload tweets without refreshing
    // setTimeout(() => {
    // })
  })

  
  const createTweetElement = function(data) {
    const $returnTweet = $("<article>").addClass("tweet");
    const name = data.user.name;
    const handle = data.user.handle;
    const content = data.content.text;
    $returnTweet.append(`
    
    <header><img src="${data.user.avatars}">${name}<span>${handle}</span></header>
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