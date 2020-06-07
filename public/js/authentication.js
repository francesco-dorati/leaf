/* eslint-disable no-undef */
const usernameForm = $('#username-form');
const emailForm = $('#email-form');
const passwordForm = $('#password-form');
const repeatPasswordForm = $('#repeat-password-form');
const username = $('#username');
const email = $('#email');
const password = $('#password');
const repeatPassword = $('#repeat-password');
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

  /* PASSWORD */
  let length = false;
  let strength = false;
  let compatibility = false;
  const updateDOM = (len, str, comp) => {
    // Length
    if (len) {
      $('#length #passed').removeClass('d-none').removeClass('d-inline').addClass('d-inline');
      $('#length #not-passed').removeClass('d-inline').removeClass('d-none').addClass('d-none');
    } else {
      $('#length #passed').removeClass('d-inline').removeClass('d-none').addClass('d-none');
      $('#length #not-passed').removeClass('d-none').removeClass('d-inline').addClass('d-inline');
    }

    // Strength
    if (str) {
      $('#strength #passed').removeClass('d-none').removeClass('d-inline').addClass('d-inline');
      $('#strength #not-passed').removeClass('d-inline').removeClass('d-none').addClass('d-none');
    } else {
      $('#strength #passed').removeClass('d-inline').removeClass('d-none').addClass('d-none');
      $('#strength #not-passed').removeClass('d-none').removeClass('d-inline').addClass('d-inline');
    }

    // Compatibility
    if (comp) {
      $('#compatibility #passed').removeClass('d-none').removeClass('d-inline').addClass('d-inline');
      $('#compatibility #not-passed').removeClass('d-inline').removeClass('d-none').addClass('d-none');
    } else {
      $('#compatibility #passed').removeClass('d-inline').removeClass('d-none').addClass('d-none');
      $('#compatibility #not-passed').removeClass('d-none').removeClass('d-inline').addClass('d-inline');
    }

    if (len && str && comp) submit.attr('disabled', false);
    else submit.attr('disabled', true);
  };

  passwordForm.on('keyup', () => {
    const regEx = /(?=.*[0-9])(?=.*[a-z])/g;

    length = password.val().length >= 8;

    strength = regEx.test(password.val());

    compatibility = repeatPassword.val() === password.val();

    updateDOM(length, strength, compatibility);
  });

  repeatPasswordForm.on('keyup', () => {
    compatibility = repeatPassword.val() === password.val();

    updateDOM(length, strength, compatibility);
  });
});
