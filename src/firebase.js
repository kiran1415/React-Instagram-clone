import firebase from 'firebase';



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBA4bu9VNc4oea3OHu0VEvXzWDbH_t5a7s",
    authDomain: "instagram-clone-57fcf.firebaseapp.com",
    databaseURL: "https://instagram-clone-57fcf.firebaseio.com",
    projectId: "instagram-clone-57fcf",
    storageBucket: "instagram-clone-57fcf.appspot.com",
    messagingSenderId: "257429899823",
    appId: "1:257429899823:web:c1299fe42174e4092694da",
    measurementId: "G-CRFMDFSTXD"

});

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage =firebase.storage();


export {db,auth,storage};