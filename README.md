# <a href="https://leaf-project.herokuapp.com/">leaf</a>
This application includes:
-
- a user system
- a main thread where users can post and vote other's people posts in real time
- a private real-time chat

This application has being built with:
-
- <b>MongoDB</b> for the database
- <b>Node.js</b> for the backend
  - <b>Express</b> framework to menage the web app
  - <b>Socket.io</b> to menage real-time chat and posting
  - <b>mongodb</b> default node driver
  - <b>Passport</b> for user authentication
  
- <b>jQuery</b> to menage real time front-end updates.

- <b>Bootstrap 4.0</b> to make the look a little better

To do list/bug fixes:
-
- BUG: when a message is received and the user is on the single chat page, the message isn't count as read
- Login/Register controls (password length, check for already used emails/usernames)
- E-mail Verification
- Fix timing problems(when sending posts/messages)
- Modify profile
- Menage user images
- add 404 buttons
- add /admin route
