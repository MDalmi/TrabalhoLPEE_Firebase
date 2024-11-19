import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from
    "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from
    "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqJU-ghekGI9AnBcqV9dR1dxue-Ku7FeY",
    authDomain: "trabalholpee.firebaseapp.com",
    projectId: "trabalholpee",
    storageBucket: "trabalholpee.firebasestorage.app",
    messagingSenderId: "569326381920",
    appId: "1:569326381920:web:3922bad7a3fed8dad88c05",
    measurementId: "G-HTDLKTGNT7"
  };
  

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
//export default firebaseApp;
const GithubAuth = new GithubAuthProvider();
const signInWithGitHub = async () => {
    try {
        const res = await signInWithPopup(auth, GithubAuth);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    signInWithGitHub,
    logout,
};