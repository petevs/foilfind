import { toKebabCase } from "./getProductRoutes"
import { query, collection, getDocs, where } from 'firebase/firestore'
import { db } from '../firebase'

export const getRetailerPaths = async () => {

    const retailerList = []
    const q = query(collection(db, 'retailers'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const retailer = doc.data()
        retailerList.push(retailer)
    })

    const paths = retailerList.map(item => ({
        params: {
            retailer: (toKebabCase(item.name)),
        }
    }))

    return paths

}


export const getRetailer = async ( retailer ) => {
    const retailerList = []
    const q = query(collection(db, 'retailers'), where('path', '==', retailer))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const currentRetailer = doc.data()
        retailerList.push(currentRetailer)
    })
    const selectedRetailer = retailerList[0]

    return selectedRetailer
}