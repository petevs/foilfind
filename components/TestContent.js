import { Box } from "@mantine/core"
import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useState, useEffect } from "react"
import parse from 'html-react-parser'

const TestContent = () => {


    const [post, setPost] = useState(null)

    useEffect(() => {

        const getPost = async () => {
            const docRef = doc(db, 'products', 'Clca96OU79gIwh2ovGFk')
            const docSnap = await getDoc(docRef)
            setPost(docSnap.data())
        }

        getPost()

    },[])


    return(
        <>
            <Box>
                {
                !post ?
                'Loading'
                : 
                parse(post.description)
                }
            </Box>
        </>
    )

}

export default TestContent