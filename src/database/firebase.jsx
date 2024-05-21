import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA69_syweXcXii5cu_Z_cMVrnkGHiKXF_s",
    authDomain: "instablog-d70e8.firebaseapp.com",
    projectId: "instablog-d70e8",
    storageBucket: "instablog-d70e8.appspot.com",
    messagingSenderId: "787236352873",
    appId: "1:787236352873:web:38e9c554e8bfc3ffa003f8"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);