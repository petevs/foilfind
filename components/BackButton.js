import { useRouter } from 'next/router'
import { Button } from '@mantine/core'


const BackButton = () => {

    const router = useRouter()
    
    return (
        <Button
            onClick={() => router.back()}
        >
            Go Back
        </Button>
    )
}

export default BackButton