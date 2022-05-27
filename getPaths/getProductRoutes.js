import { db } from '../firebase'
import { query, collection, getDocs, where } from 'firebase/firestore'

export const toKebabCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export const getBrands = async () => {
    const brandPaths = []
    const q = query(collection(db, 'brands'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const brand = doc.data()
      brandPaths.push(brand)
    })

    return brandPaths.map(item => item.brandName)
}

export const getBrandsWithDetails = async () => {
    const brands = []
    const q = query(collection(db, 'brands'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const brand = doc.data()
      brands.push(brand)
    })

    return brands
}


const getAllProducts = async () => {
    const productList = []
    const q = query(collection(db, 'products'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const product = doc.data()
        productList.push(product)
    })
    return productList
}

const getBrandProducts = async (brand) => {
    const productList = []
    const q = query(collection(db, 'products'), where("brand", "==", brand))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const product = doc.data()
        productList.push({
            ...product,
            id: doc.id
        })
    })
    return productList
}



export const getProductRoutes = async () => {

    const brands = await getBrands()

    const paths = []

    for await (const brand of brands) {
        const products = await getBrandProducts(brand)
        products.forEach(product => {
            paths.push({
                params: {
                    brand: (brand.toLowerCase()),
                    product: (toKebabCase(product.title)),
                    id: product.id
                }
            })
        })
    }

    console.log(paths)
    return paths

}