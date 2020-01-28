/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [
    {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIssac"
    },
    "content": {
      "text": "If I have seen further, it is by standing on the shoulders of giants"
    },
    "created at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense, donc je suis"
    },
    "created at": 1461116232226
  }
];
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

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').append($tweet);
    }
  }
  renderTweets(data);
});