import { Box, Image, Text, AspectRatio } from "@mantine/core"
import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useState, useEffect } from "react"
import parse from 'html-react-parser'
import { Swiper, SwiperSlide } from "swiper/react"
import Product from "./product/Product"

const TestContent = () => {


    const [post, setPost] = useState(null)

    useEffect(() => {

        const getPost = async () => {
            const docRef = doc(db, 'products', 'asSdIWbgcLT5zbRHfJYr')
            const docSnap = await getDoc(docRef)
            setPost(docSnap.data())
        }

        getPost()

    },[])

    return(
        <>
            <Product product={post} />
        </>
    )

}

export default TestContent