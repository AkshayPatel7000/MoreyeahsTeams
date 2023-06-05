// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCp8HJXwIfI_EihXTzRFJdq-SKYZ446j7k",
  authDomain: "moreyeahsteams.firebaseapp.com",
  projectId: "moreyeahsteams",
  storageBucket: "moreyeahsteams.appspot.com",
  messagingSenderId: "364892343079",
  appId: "1:364892343079:web:a5911cd532fcbee232b702",
};

const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();
const auth = app.auth();
var provider = new firebase.auth.GoogleAuthProvider();
export { app, firestore, auth, provider };
