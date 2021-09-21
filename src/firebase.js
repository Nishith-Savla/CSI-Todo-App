import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: "csi-todo-app-55f06.firebaseapp.com",
	projectId: "csi-todo-app-55f06",
	storageBucket: "csi-todo-app-55f06.appspot.com",
	messagingSenderId: "581427243325",
	appId: "1:581427243325:web:0308be963c11656d18fd54",
});

const db = getFirestore(app);
export default db;
