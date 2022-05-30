import { query, collection, getDocs } from "firebase/firestore"
import { db} from '../firebase'

export const getCollection = async ( collectionName) => {
    const collectionList = []
    const q = query(collection(db, collectionName))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const item = doc.data()
        collectionList.push(item)
    })
    return collectionList
}
