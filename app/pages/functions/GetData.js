import {getAuth} from 'firebase/auth';
import {initializeApp} from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyAvf-gvB_eXWSYcRytg052UAqQI7XTgBNY",
    authDomain: "languageapp-5fa29.firebaseapp.com",
    projectId: "languageapp-5fa29",
    storageBucket: "languageapp-5fa29.firebasestorage.app",
    messagingSenderId: "672634105164",
    appId: "1:672634105164:web:73bf5dbb2a0e1b4ae7f3e9",
    measurementId: "G-20CR15B4WH"
};

// Initialize firebase
const app = initializeApp(firebaseConfig);

// Set up authenticator
const auth = getAuth(app);

export async function GetData(){
    
    return auth.currentUser;
}