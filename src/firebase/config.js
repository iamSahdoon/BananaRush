import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQ6-gLh_9EvNvd1S8uKZzztQthTmdvNmY",
  authDomain: "banana-rush-19cbc.firebaseapp.com",
  projectId: "banana-rush-19cbc",
  storageBucket: "banana-rush-19cbc.firebasestorage.app",
  messagingSenderId: "517767993314",
  appId: "1:517767993314:web:d288182c68c189851fcbbb",
};

// Initialize Firebase
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
