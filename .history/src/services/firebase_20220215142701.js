import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBY7OUOwpaDpm1x4hauQUuan7HNNuYc0VY",
  authDomain: "letmeask-ea2a1.firebaseapp.com",
  databaseURL: "https://letmeask-ea2a1-default-rtdb.firebaseio.com",
  projectId: "letmeask-ea2a1",
  storageBucket: "letmeask-ea2a1.appspot.com",
  messagingSenderId: "312022902011",
  appId: "1:312022902011:web:242cf2e01aeed8c3d97c5e"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();