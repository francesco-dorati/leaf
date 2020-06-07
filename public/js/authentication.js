const usernameForm = $('#username-form');
const emailForm = $('#email-form');
const passwordForm = $('#password-form');
const repeatPasswordForm = $('#repeat_password-form');
const username = $('#username');
const email = $('#email');
const password = $('#password');
const repeatPassword = $('#repeat_password');
const submit = $('#submit');
let usernameValid = true;
let emailValid = true;

$(() => {
/* USERNAME */ // ADD LENGTH CHECK ----------------------------------------------------------------
  usernameForm.on('focusout', () => {
    if (username.val()) {
      $.ajax({
        url: '/authentication/username',
        data: {
          username: username.val(),
        },
        method: 'POST',
        success: (valid) => {
          if (valid) {
            usernameValid = true;
            username.addClass('is-valid');
            if (emailValid) submit.attr('disabled', false);
          } else {
            usernameValid = false;
            username.addClass('is-invalid');
            submit.attr('disabled', true);
          }
        },
      });
    }
  });
  usernameForm.on('keyup', () => {
    username.removeClass('is-invalid').removeClass('is-valid');
  });

  /* EMAIL */ // ADD EMAIL CHECK --> REGEX
  emailForm.on('focusout', () => {
    if (email.val()) {
      $.ajax({
        url: '/authentication/email',
        data: {
          email: email.val(),
        },
        method: 'POST',
        success: (valid) => {
          if (valid) {
            emailValid = true;
            email.removeClass('is-invalid');
            if (usernameValid) submit.attr('disabled', false);
          } else {
            emailValid = false;
            email.addClass('is-invalid');
            submit.attr('disabled', true);
          }
        },
      });
    }
  });
  emailForm.on('keyup', () => {
    email.removeClass('is-invalid');
  });
});
