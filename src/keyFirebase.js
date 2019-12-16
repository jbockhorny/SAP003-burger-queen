import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC7t3oQFd66zokL2o3Yh7-ahABmC8y5n6g",
    authDomain: "burger-queen-3311b.firebaseapp.com",
    databaseURL: "https://burger-queen-3311b.firebaseio.com",
    projectId: "burger-queen-3311b",
    storageBucket: "burger-queen-3311b.appspot.com",
    messagingSenderId: "648850397360",
    appId: "1:648850397360:web:9c0647a6e2a6d9e62c8375",
    measurementId: "G-7X7P8W4XRN"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase;