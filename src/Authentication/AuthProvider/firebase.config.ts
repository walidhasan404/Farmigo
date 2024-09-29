// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSo8w9QMehHmA5uo15kAi4VY50fG_GbIo",
  authDomain: "farmigo-auth.firebaseapp.com",
  projectId: "farmigo-auth",
  storageBucket: "farmigo-auth.appspot.com",
  messagingSenderId: "84166252477",
  appId: "1:84166252477:web:3d8c32aa496918566f24d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//google auth

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const authWithGoogle = async() => {
 let user = null
 await signInWithPopup(auth, provider)
 .then((result)=>{
    user = result.user
 }).catch((err)=>{
    console.log(err);
 })
 return user
}