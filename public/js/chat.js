/* eslint-disable */
const socket = io('http://localhost:80');
const form = $('#message-form');
const input = $('#message-input');
const container = $('#message-canvaas');
const { user, receiver } = window
const resetScroll = () => {
  $('#message-canvaas').scrollTop($('#message-canvaas').prop('scrollHeight'));
}; 

$(() => {
  resetScroll()
  
  form.submit(() => {
    socket.emit('chat', {
      sender: `${user.username}`,
      receiver: `${receiver}`,
      time: moment(),
      body: input.val(),
    });
    setTimeout(() => {
      location.reload();
    }, 10)
  });
  
});

socket.on(`${user.username}`, (message) => {
  container.append(`
    <div class="col-10 col-lg-7 py-3 mr-auto">
    <div class="toast">
    <div class="toast-header">
    <img src="/images/profile-picture.jpg" class="rounded mr-2"  height="20" width="20">
    <strong class="mr-auto"><a class="profile-link" href="/user/${message.sender}">${message.sender}</a></strong>
    <small>${moment(message.time).fromNow()}</small>
    </div>
    <div class="toast-body">
    ${message.body}
    </div>
    </div>
    </div>
  `);
resetScroll()
$.ajax({
  url: '/notifications/reset',
  data: {
    username: message.username,
  },
});
// DELETE NOTIFICATIONS
});
