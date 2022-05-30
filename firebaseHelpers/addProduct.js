import { db } from '../firebase'
import { doc, addDoc, Timestamp, collection } from 'firebase/firestore'

export const addProduct = async (item) => {
    try {
        const docRef = await addDoc(collection(db, 'products'), {
            ...item
        })
}
    catch (error) {
        console.log('Error adding document: ', error);
    }

}