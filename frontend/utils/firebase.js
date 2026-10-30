// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "novaai-1c365.firebaseapp.com",
  projectId: "novaai-1c365",
  storageBucket: "novaai-1c365.firebasestorage.app",
  messagingSenderId: "344914946384",
  appId: "1:344914946384:web:98ee39fdd74761fff9a455"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()