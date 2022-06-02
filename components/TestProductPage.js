import { Container } from "@mantine/core"
import { functions } from "../firebase"
import { httpsCallable } from 'firebase/functions'
import { useEffect, useState } from 'react'

const TestProductPage = () => {

    const [price, setPrice] = useState('')


    useEffect(() => {

        const getPrice = httpsCallable(functions, 'getPrice')

        const tester = async () => {
            const result = await getPrice({ url: 'https://www.realwatersports.com/collections/foiling/products/2021-lift3-efoil-complete-package'})
            console.log(result)
            setPrice(result.data.price)
        }

        tester()

    }, [])

    return (
        <Container size='xl' p='xl'>
            This message is: {price}
        </Container>
    )
}

export default TestProductPage