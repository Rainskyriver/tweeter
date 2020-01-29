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

    console.log($(this).text)

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
    const escaped = $('<span>').text(data.content.text).html();
    $returnTweet.append(`
    <header><img src="${data.user.avatars}">${name}<span>${handle}</span></header>
    ${escaped}
    <hr>
    <footer>${data["created_at"]}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></footer>
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