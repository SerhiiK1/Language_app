import {getAuth} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { doc, setDoc, getDoc, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAvf-gvB_eXWSYcRytg052UAqQI7XTgBNY",
    authDomain: "languageapp-5fa29.firebaseapp.com",
    projectId: "languageapp-5fa29",
    storageBucket: "languageapp-5fa29.firebasestorage.app",
    messagingSenderId: "672634105164",
    appId: "1:672634105164:web:73bf5dbb2a0e1b4ae7f3e9",
    measurementId: "G-20CR15B4WH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export async function setExperienceData(userId, experience) {
    try {
        await setDoc(doc(db, "users", userId), { experience: experience }, { merge: true });
        console.log("Experience data successfully set!");
    } catch (error) {
        console.error("Error setting experience data: ", error);
    }
}

export async function fetchUserData(uid) {
    try {
        console.log("Fetching Firestore data for user:", uid);
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            console.log("Fetched data:", userDoc.data());
            return userDoc.data();
        } else {
            console.log("No document found for this user.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}