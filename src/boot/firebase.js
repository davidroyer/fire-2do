import * as firebase from "firebase/app"

import "firebase/auth"
import "firebase/database"


// ADD YOUR FIREBASE CONFIG OBJECT HERE:
var firebaseConfig = {
  apiKey: "AIzaSyDbAMBWch1cNrXCnfWZDXQvTljkBogl-ho",
  authDomain: "fire-2do-app.firebaseapp.com",
  databaseURL: "https://fire-2do-app.firebaseio.com",
  projectId: "fire-2do-app",
  storageBucket: "fire-2do-app.appspot.com",
  messagingSenderId: "572723294876",
  appId: "1:572723294876:web:63216a1828f50dab"
}

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }