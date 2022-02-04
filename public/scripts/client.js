$(document).ready(function() {

    const renderTweets = function(tweets) {
      const $tweetPage = $(('.tweet-data'));
  
  
      tweets.forEach((tweetObj) => {
        let tweet = createTweetElement(tweetObj);
        $tweetPage.prepend(tweet);
      })
    }
  
    const $form = $('#new_tweet-form');
    $form.submit(function(e) {
      e.preventDefault();
  
      let charCount = $('#tweet-text').val();
  
      if(charCount === "" || null) {
        return $('.alert').text("You can't tweet empty tweet").slideDown(() => {
          setTimeout(() => {
            $('.alert').slideUp();
          }, 3000);
        })
        
      };
  
      if(charCount.length > 140) {
        return $('.alert').text("You have exceed the number of words allowed!!").slideDown(() => {
          setTimeout(() => {
            $('.alert').slideUp();
          }, 3000);
        })
  
      };
  
      const serialization = $(this).serialize();
  
      $.post("/tweets/", serialization, (response) => {
        $('#tweet-text').val('') // clears tweet textarea by moving cursor back
        $('.counter').text(140)
        const $tweetPage = $(('.tweet-data'));
        $tweetPage.empty();
        loadtweets();
      })
    })
  
    // making a GET request to server
    const loadtweets = function() {
      $.ajax({
        url: "/tweets",
        method: "GET",
        dataType: "json",
        success: (tweets) => {
          renderTweets(tweets);
        },
        error: (err) => {
          console.log(`there was an error: ${err}`);
        }
      })
    }
  
    loadtweets();
  
    const createTweetElement = (dataObj) => {
  
      const $img = $('<img>').attr('src', dataObj.user.avatars).addClass('images');
  
      const $parAvatarName = $('<p>')
        .addClass('userName')
        .text(dataObj.user.name)
  
      const $divAvatarName = $('<div>')
        .addClass('user')
        .append($img)
        .append($parAvatarName)
  
      const $parHandle = $('<p>')
        .addClass('user@')
        .text(dataObj.user.handle);
  
      const $parContent = $('<p>')
        .addClass('tweet-text')
        .text(dataObj.content.text);
  
      const $lineBreak = $('<hr>')
        
  
      const $timestamp = $('<p>')
        .addClass('date')
        .text(timeago.format(dataObj.created_at));
  
      const $divSocial = $('<div>')
        .addClass('icons')
        .html('<i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i>');
  
      const $header = $('<header>')
        .addClass('tweet-data-header')
        .append($divAvatarName)
        .append($parHandle);
  
      const $footer = $('<footer>')
        .addClass('tweet-data-footer')
        .append($timestamp)
        .append($divSocial);
  
      const $article = $('<article>')
        .addClass('tweet-data-article');
  
      return $article
        .append($header)
        .append($parContent)
        .append($lineBreak)
        .append($footer);
  
    };
  
  });
  
  $(window).on("scroll", function() {
    let scrollPos = $(window).scrollTop();
    if (scrollPos <= 0) {
        $("#scrollUp").fadeOut();
    } else {
        $("#scrollUp").fadeIn();
    }
  });
  $(".down-arrow").click(function (e) {
    e.preventDefault();
    $(".new_tweet").css("display", "block");
  });