import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDTdJNBjYCYfVaa1DYIgXcCV2nqIqFSShs",
    authDomain: "beeloved-matchmaker.firebaseapp.com",
    projectId: "beeloved-matchmaker",
    storageBucket: "beeloved-matchmaker.appspot.com",
    messagingSenderId: "313472055164",
    appId: "1:313472055164:web:c4a7935382d7581e3056f9",
    measurementId: "G-M554H5DD7H"
  };

  firebase.initializeApp(firebaseConfig);
  export default firebase;
