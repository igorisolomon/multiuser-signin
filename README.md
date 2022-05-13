# Task
Design a web application with a simple form that can sign in a user with just a username. (No API is required)

When the user is signed on, it should display the currently signed in username, a button to log out of the account or sign in with a different username.

The current page on focus should also display the list of all active sessions on the browser. You should be able to logout any other active session, from the focused tab if it is currently signed on and display their presence status. Presence status can be active or idle A tab that has not received focus in the past 60 seconds, should be regarded as idle.

This is what we care about in the state of the application:

1. The signed in user should remain signed on even with a browser refresh

2. A user can be signed on with a different username in another tab of the same browser

3. The application is able to manage the sessions of all users

4. When a new tab is opened, it should start with the state of the last active signed on username on the browser

5. Signing in with a username that is already active, should drag focus to the tab with that username.

6. Username should be case insensitive

7. It should work on Chrome, Firefox and Safari You can deploy your solution to Heroku, Netlify, Vercel or anywhere convenient for you