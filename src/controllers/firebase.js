const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyAun4s872zNtvCOZNqv8Ysj-kYBsCiQVkI",
  authDomain: "pictest-b870a.firebaseapp.com",
  databaseURL: "https://pictest-b870a.firebaseio.com",
  projectId: "pictest-b870a",
  storageBucket: "pictest-b870a.appspot.com",
  messagingSenderId: "1073173443246",
  appId: "1:1073173443246:web:ac4d24c72fc35c3085333f",
  measurementId: "G-X28PPTP8EN",
};

firebase.initializeApp(config);

module.exports = firebase;