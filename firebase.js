import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCNpmrUqt6ucP2yyM_CZ7yVgJnUUFj1kA8",
  authDomain: "whatsapp-618.firebaseapp.com",
  projectId: "whatsapp-618",
  storageBucket: "whatsapp-618.appspot.com",
  messagingSenderId: "45635771334",
  appId: "1:45635771334:web:8133f9c599f173cc37f0c7",
  measurementId: "G-VNJRM4Y9M3"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };