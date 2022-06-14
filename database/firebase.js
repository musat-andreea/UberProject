
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAx8_fKZaDZPAE2aUk0k67WJK9q1x1gpGk",
    authDomain: "projectuber-115a0.firebaseapp.com",
    projectId: "projectuber-115a0",
    storageBucket: "projectuber-115a0.appspot.com",
    messagingSenderId: "306217664603",
    appId: "1:306217664603:web:cc8f7929c5d8479e30ff7e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
