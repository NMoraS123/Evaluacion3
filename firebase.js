// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1zlCzPgdJAdQho3VheVBiCBmu5S0J6Bs",
    authDomain: "taller-1f964.firebaseapp.com",
    projectId: "taller-1f964",
    storageBucket: "taller-1f964.appspot.com", 
    messagingSenderId: "468393145390", 
    appId: "1:468393145390:web:f1e8867ece7e944332dbbf"
} 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const save = (vehiculo) => {
    addDoc(collection(db, 'Vehiculo'), vehiculo)
}
export const getAll = (data) => {
    onSnapshot(collection(db, 'Vehiculo'), data)
}
export const remove = (id) => {
    deleteDoc(doc(db, 'Vehiculo', id))
}
export const selectOne = (id) => getDoc(doc(db, 'Taller', id))

export const edit = (id, vehiculo) => {
    updateDoc(doc(db, 'Vehiculo', id), vehiculo)
}