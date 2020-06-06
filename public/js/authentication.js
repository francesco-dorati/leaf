const usernameForm = $('#username-form');
const emailForm = $('#email-form');
const passwordForm = $('#password-form');
const repeatPasswordForm = $('#repeat_password-form');
const username = $('#username');
const email = $('#email');
const password = $('#password');
const repeatPassword = $('#repeat_password');


$(() => {
  // ADD LENGTH CHECK ----------------------------------------------------------------
  usernameForm.on('focusout', () => {
    if (username.val()) {
      $.ajax({
        url: '/authentication/username',
        data: {
          username: username.val(),
        },
        method: 'POST',
        success: (valid) => {
          if (valid) username.removeClass('is-invalid').addClass('is-valid');
          else username.removeClass('is-valid').addClass('is-invalid');
        },
      });
    }
  });

  emailForm.on('focusout', () => {
    if (email.val()) {
      $.ajax({
        url: '/authentication/email',
        data: {
          email: email.val(),
        },
        method: 'POST',
        success: (valid) => {
          if (valid) email.removeClass('is-invalid');
          else email.addClass('is-invalid');
        },
      });
    }
  });
  
});
