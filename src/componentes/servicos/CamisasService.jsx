import { auth, db } from '../../firebaseConfig';
import {
    doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where
} from "firebase/firestore";

export const getCamisasFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'camisas'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                ano: doc.data().ano,
                time: doc.data().time,
                tipo: doc.data().tipo,
                valor: doc.data().valor,
                url: doc.data().url,
                usuario: doc.data().usuario,
                email: doc.data().email,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getCamisasUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "camisas");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                ano: doc.data().ano,
                time: doc.data().time,
                tipo: doc.data().tipo,
                valor: doc.data().valor,
                url: doc.data().url,
                usuario: doc.data().usuario,
                email: doc.data().email,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deleteCamisasFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'camisas', objeto.id)
        await deleteDoc(postDocRef);
    } catch (err) {
        throw err;
    }
}

export const addCamisasFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'camisas'),
            {
                ano: objeto.ano,
                time: objeto.time,
                valor: objeto.valor,
                tipo: objeto.tipo,
                url: objeto.url,
                uid: objeto.uid,
                usuario: objeto.usuario,
                email: objeto.email
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updateCamisasFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'camisas', objeto.id)
        await updateDoc(postDocRef, {
            ano: objeto.ano,
            time: objeto.time,
            valor: objeto.valor,
            tipo: objeto.tipo,
            url: objeto.url,
            uid: objeto.uid,
            usuario: objeto.usuario,
            email: objeto.email
        })
    } catch (err) {
        throw err;
    }
}