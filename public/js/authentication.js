const usernameForm = $('#username-form');
const emailForm = $('#email-form');
const passwordForm = $('#password-form');
const repeatPasswordForm = $('#repeat_password-form');
const username = $('#username');
const email = $('#email');
const password = $('#password');
const repeatPassword = $('#repeat_password');
const usernameInvalidFeedback = $('#username-form .invalid-feedback');
const emailInvalidFeedback = $('#email-form .invalid-feedback');
const submit = $('#submit');
let usernameValid = true;
let emailValid = true;

$(() => {
/* USERNAME */
  usernameForm.on('focusout', () => {
    // Length
    if (username.val()) {
      if (username.val().length > 3) {
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
              usernameInvalidFeedback.text('Username already taken.');
              submit.attr('disabled', true);
            }
          },
        });
      } else {
        usernameValid = false;
        username.addClass('is-invalid');
        usernameInvalidFeedback.text('4 characters minimum.');
        submit.attr('disabled', true);
      }
    }
  });
  usernameForm.on('keyup', () => {
    username.removeClass('is-invalid').removeClass('is-valid');
  });

  /* EMAIL */
  emailForm.on('focusout', () => {
    // reg ex
    if (email.val()) {
      const regEx = /^\S+@\w+\.+\w+$/;
      if (regEx.test(email.val())) {
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
              emailInvalidFeedback.html('This email is already registered, go to <a href="/login">login</a>.');
              submit.attr('disabled', true);
            }
          },
        });
      } else {
        emailValid = false;
        email.addClass('is-invalid');
        emailInvalidFeedback.text('Enter a valid email address.');
        submit.attr('disabled', true);
      }
    }
  });
  emailForm.on('keyup', () => {
    email.removeClass('is-invalid');
  });
});
