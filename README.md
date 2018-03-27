# MOBILE FLASHCARDS - UDACITY NANODEGREE
This is the final project for the React Udacity Nanodegree using React Native.

This project has been tested on **Google Pixel 7.1.0 - API 25**

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

[Expo](https://expo.io) was used to test the app on real mobile devices.

## Installing

* Clone the repo
* Access the folder from the terminal and run `npm install`

## Running the project
Once all the dependencies are installed you can start the project by running `npm start`

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

## Architecture notes
* React and React Native is used for the visual components
* React Navigation is used for navigating between screens
* Redux is used to manage the state of the application
* The AsyncStorage is used for storing all the data in the app.