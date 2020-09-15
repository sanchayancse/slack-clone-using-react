import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyDaYnGz5qJSXKF435odqPuY3yKY4amMyro",
    authDomain: "slack-clone-752a4.firebaseapp.com",
    databaseURL: "https://slack-clone-752a4.firebaseio.com",
    projectId: "slack-clone-752a4",
    storageBucket: "slack-clone-752a4.appspot.com",
    messagingSenderId: "1084432378597",
    appId: "1:1084432378597:web:0ca71539d6518e4bbf820c",
    measurementId: "G-6CWX3X4JMM"
  };


  const fire = firebase.initializeApp(firebaseConfig);



  export default fire;