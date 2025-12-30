import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf0bNSEPwcu8Z3Yd2sK6w83adgjLNkfR0",
  authDomain: "school-builder.firebaseapp.com",
  projectId: "school-builder",
  storageBucket: "school-builder.firebasestorage.app",
  messagingSenderId: "857417937768",
  appId: "1:857417937768:web:9221d5c9846682dec55cdd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


