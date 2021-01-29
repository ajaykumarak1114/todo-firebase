import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDeMnc2JRINw9QqKrLSETI9J5yHmAy6Q8k",
  authDomain: "todo-app-85998.firebaseapp.com",
  projectId: "todo-app-85998",
  storageBucket: "todo-app-85998.appspot.com",
  messagingSenderId: "448823324757",
  appId: "1:448823324757:web:a2612773f93fc429bea4dc",
  measurementId: "G-Q9T8J0CBL0"
});

 const db = firebaseApp.firestore();

 export default db