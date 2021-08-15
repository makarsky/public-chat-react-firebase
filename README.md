# Emoji Chat

[Live Demo](https://public-chat-react-firebase.vercel.app/)

## Stack

- Typescript

- React

- Firebase

- Material-UI

## Firestore rules with rate limiting (1 message per 15 seconds)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageUid} {
      allow read;
      allow write: if isAuthenticated();
      function isAuthenticated() {
      	return request.auth.uid != null && isCalm();
      }
      function isCalm() {
      	return isUserNotRegistered() || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.rateLimit.lastMessage  + duration.value(15, 's') < request.resource.data.timestamp;
      }
      function isUserNotRegistered() {
      	return !exists(/databases/$(database)/documents/users/$(request.auth.uid));
      }
    }
    match /users/{userUid} {
      allow read;
      allow write: if request.auth.uid != null;
    }
  }
}
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Useful links

[Easy start of a Typescript/React project (w/ Yarn, ESlint and Prettier)](https://dev.to/viniciusmdias/easy-start-of-a-typescript-react-project-w-eslint-and-prettier-55d4)

[Firebase rules (anonymous and authentificated)](https://stackoverflow.com/a/52593564)

[Anonymous auth was added with restricted HTTP referrers in order to secure the app, so no one could use its keys on localhost and send some unfiltered data to firestore](https://console.developers.google.com/apis/credentials)

[How to secure your Firebase project even when your API key is publicly available](https://medium.com/@devesu/how-to-secure-your-firebase-project-even-when-your-api-key-is-publicly-available-a462a2a58843)

[Is it safe to expose Firebase apiKey to the public?](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public)

[Firebase security checklist](https://firebase.google.com/support/guides/security-checklist)

[Firebase server time usage and rate limiting](https://stackoverflow.com/questions/56487578/how-do-i-implement-a-write-rate-limit-in-cloud-firestore-security-rules)

[Firebase server time usage and rate limiting 2](https://stackoverflow.com/questions/24830079/firebase-rate-limiting-in-security-rules)

[Security Rules](https://www.youtube.com/watch?v=eW5MdE3ZcAw)

[Transactions and batched writes](https://firebase.google.com/docs/firestore/manage-data/transactions#web)

[Timer component](https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks)

## Icon generators

[AndroidAssetStudio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=clipart&foreground.clipart=chat&foreground.space.trim=0&foreground.space.pad=0.25&foreColor=rgb(255%2C%20238%2C%2088)&backColor=rgb(25%2C%20118%2C%20210)&crop=0&backgroundShape=square&effects=none&name=ic_launcher)

[appicon.co](https://appicon.co/)

```
sudo apt-get install imagemagick
convert -resize 1024X768 source.png dest.jpg
convert 16.png 24.png 32.png 64.png -colors 128 icon.ico
```
