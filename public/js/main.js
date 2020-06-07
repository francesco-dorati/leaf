/* eslint-disable */
const postForm = $('#post-form');
const discoverForm = $('#discover-form');
const postSubmit = $('#post-submit');
const postText = $('#post-text');
const discoverText = $('#discover-text');
const upvote = $(".upvote");
const downvote = $(".downvote");
const postContainer = $('#post-container');
const socket = io('http://localhost:80');
moment().format();
const { user } = window
console.log(user);


$(() => {
  postSubmit.on('click', () => {
    if (postText.val() != '' && postText.val() != ' '){
      socket.emit('post-submit', {
        username: user.username,
        code: user.code,
        imgPath: user.imgPath,
        time: moment(),
        body: postText.val(),
        votes: 0,
      });
      setTimeout(() => {
        location.reload();
      }, 10)
    }
    // IF NOT EMPTY
  });

  $('body').on('click', '.upvote', function() {
    let value = Number($(this).next().text())
    let id = $(this).parents(".post").attr("id");
    if ($(this).hasClass('upvoted')) {
      // IF UPVOTED
      $(this).removeClass("upvoted")
      $(this).next().removeClass("upvoted");
      $(this).next().text(--value);
      socket.emit('post-voted', {
         id, 
         value: -1, 
         username: user.username,
         action: 'remove',
         code: user.code,
      });
    } else if ($(this).next().hasClass("downvoted")) {
      // IF DOWNVOTED
      $(this).next().removeClass("downvoted");
      $(this).next().next().removeClass("downvoted");
      $(this).addClass('upvoted');
      $(this).next().addClass('upvoted');
      $(this).next().text(value+2);
      // REPLACE
      socket.emit('post-voted', {
         id, 
         value: 2,
         username: user.username, 
         type: 'upvoted',
         action: 'replace',
         code: user.code,
      });
    } else {
      // IF NO VOTES
      $(this).addClass("upvoted");
      $(this).next().addClass("upvoted");
      $(this).next().text(++value);
      socket.emit('post-voted', {
        id,
        value: 1,
        username: user.username, 
        type: 'upvoted',
        action: 'create',
        code: user.code,
      });
    }
    console.log($(this).next().text());
  });

  $('body').on('click', '.downvote', function() {
    let value = Number($(this).prev().text());
    let id = $(this).parents(".post").attr("id");
    // IF UPVOTED
    if ($(this).prev().hasClass('upvoted')) {
      $(this).prev().removeClass("upvoted");
      $(this).prev().prev().removeClass("upvoted");
      $(this).addClass('downvoted');
      $(this).prev().addClass('downvoted');
      $(this).prev().text(value-2);
        // REPLACE
      socket.emit('post-voted', {
         id,
         value: -2,
         username: user.username,
         type: 'downvoted',
         action: 'replace',
         code: user.code,
      });
    } else if ($(this).hasClass('downvoted')) {
      // IF DOWNVOTED
      $(this).removeClass("downvoted")
      $(this).prev().removeClass("downvoted");
      $(this).prev().text(++value);
      // REPLACE
      socket.emit('post-voted', {
         id,
         value: 1,
         username: user.username,
         action: 'remove',
         code: user.code,
      });
    } else {
      // IF NO VOTES
      $(this).addClass('downvoted');
      $(this).prev().addClass('downvoted');
      $(this).prev().text(--value);
      // CREATE
      socket.emit('post-voted', {
         id,
         value: -1,
         username: user.username,
         type: 'downvoted',
         action: 'create',
         code: user.code,
      });
    }
    console.log($(this).prev().text());
  });
});

socket.on('main', (post) => {
  $("#no-posts").hide();
  postContainer.prepend(`
      <div class="py-3 col col-lg-10 mx-auto post" id="${post._id}">
      <div class="toast">
      <div class="toast-header">
      <img src="${post.imgPath || '/images/profile-picture.jpg' }" class="rounded mr-2" height="20" width="20">
      <strong class="mr-auto"><a class="profile-link" href="/user/${post.username}">${post.username}</a></strong>
      <small>${moment(post.time).fromNow()} </small>
      </div>
      <div class="toast-body pb-0">
      ${post.body}
      </div>
      <hr class="mb-0">
      <div>
      <button class="btn btn-link text-muted pr-1 upvote">
      <svg class="bi bi-shift-fill mb-2 align-baselin" data-rotate="90" width="1em" height="1em" fill="currentColor">
      <path fill-rule="evenodd" d="M7.27 2.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 01-1 1h-5a1 1 0 01-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z" clip-rule="evenodd"/>
      </svg> 
      </button>
      <span class="mx-1 vote">${post.votes}</span>
      <button class="btn btn-link text-muted pl-1 downvote">
      <svg class="bi bi-shift-fill rotate align-baseline" width="1em" height="1em" fill="currentColor">
      <path fill-rule="evenodd" d="M7.27 2.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 01-1 1h-5a1 1 0 01-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z" clip-rule="evenodd"/>
      </svg>
      </button>
      </div>
      </div>
      </div>
    `);
});

// ON CHAT MESSAGE RECEIVED
socket.on(`${user.username}`, (message) => {
  console.log(message);
  const chat = $('nav a[href="/chat"]');
  if (!chat.hasClass('btn-outline-danger')){
    chat.removeClass('btn-outline-success');
    chat.addClass('btn-outline-danger');
  }
});
