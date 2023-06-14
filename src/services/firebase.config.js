// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCkrQFaqi5YJtZ7C6aKXSU5-LVEVBwomkI",
//   authDomain: "testproject-b67e8.firebaseapp.com",
//   projectId: "testproject-b67e8",
//   storageBucket: "testproject-b67e8.appspot.com",
//   messagingSenderId: "1077548953353",
//   appId: "1:1077548953353:web:8b59f4155ae4a047f72dd8",
//   measurementId: "G-20835WLQZL"
// };

// const app = initializeApp(firebaseConfig);
// const collectionRef = collection(db, 'todo');


// export const db = getFirestore(app);



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkrQFaqi5YJtZ7C6aKXSU5-LVEVBwomkI",
  authDomain: "testproject-b67e8.firebaseapp.com",
  projectId: "testproject-b67e8",
  storageBucket: "testproject-b67e8.appspot.com",
  messagingSenderId: "1077548953353",
  appId: "1:1077548953353:web:8b59f4155ae4a047f72dd8",
  measurementId: "G-20835WLQZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);