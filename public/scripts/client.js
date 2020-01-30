/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  //handling the submit button
  $('form').submit(function(event) {
    event.preventDefault();
    const tweetText = ($(this).serialize());
    const $textarea = $('textarea')
    const $warning = $('#warning');
    //above 140 characters
    if ($textarea.val().length > 140) {
      const errMsg = "STOP! You've violated the law. You typed over 140 characters. Pay the court a fine or shorten your sentence. Your words are now forfeit.";
      $warning.text(errMsg)
      if ($warning.is(':hidden')) {
        $warning.slideDown("slow");
      }
      return;
    }
    //empty text
    if ($textarea.val() === '') {
      const errMsg = "STOP! You've violated the law. You tried to submit a blank tweet. Pay the court a fine or enter your sentence. You can't stay silent forever.";
      $warning.text(errMsg)
      if ($warning.is(':hidden')) {
        $warning.slideDown("slow");
      }
      return;
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
    $warning.hide();
  })
  
  //toggle-form button
  const $toggleForm = $('#toggle-form');
  $($toggleForm).click(() => {
    const $container = $('.container');
    $container.toggleClass('toggle-off')
    $('.new-tweet textarea').focus();
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
    <footer>${moment(data["created_at"]).fromNow()}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></footer>
    `)
    return $returnTweet;
  }
  
  const renderTweets = function(tweets) {
    for (let i = tweets.length - 1; i >= 0; i--) {
      const $tweet = createTweetElement(tweets[i]);
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