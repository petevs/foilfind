import { db } from '../firebase'
import { query, collection, getDocs, where } from 'firebase/firestore'

export const getProduct = async (product) => {
    const products = []
    const q = query(collection(db, 'products'), where("path", "==", product))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const product = doc.data()
        products.push({
            ...product,
            id: doc.id
        })
    })

    return products[0]

}