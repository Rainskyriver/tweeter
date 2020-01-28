/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const tweetObject = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIssac"
    },
    "content": {
      "text": "If I have seen further, it is by standing on the shoulders of giants"
    },
    "created at": 1461116232227
  };
  const createTweetElement = function(data) {
    const $returnTweet = $("<article>").addClass("tweet");
    const name = data.user.name;
    const handle = data.user.handle;
    const content = data.content.text;
    $returnTweet.append(`<header>${name}<span>${handle}</span></header>`)
    $returnTweet.append(`<span>${content}</span>`)
    $returnTweet.append(`<hr>`)


    return $returnTweet;
  }
  const $tweet = createTweetElement(tweetObject);
  console.log($tweet);
  $('#tweet-container').append($tweet);
});