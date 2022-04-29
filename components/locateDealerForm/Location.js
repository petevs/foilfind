import Headline from "./Headline"
import TypeCard from "./TypeCard"
import { Group } from "@mantine/core"
import { BsShop } from "react-icons/bs"
import { MdOutlineAddShoppingCart } from "react-icons/md"
import { Button, Autocomplete } from "@mantine/core"
import { useRouter } from "next/router"

const Location = ({back}) => {

    const router = useRouter()

    const handleClick = () => {
        router.push('/dealers/all')
    }

    return (
        <>
            <Headline
                title='Which country are you shipping to?'
            />
            <Group>
                <Autocomplete
                    placeholder="Select a country"
                    data={['United States', 'Canada', 'United Kingdom', 'Australia', 'New Zealand']}
                    size='xl'
                />
                <Button 
                    size='xl'
                    onClick={() => handleClick()}
                >
                    Show Results
                </Button>
            </Group>
            <Button variant='subtle' onClick={back} size='xs' mt='xl'>Go Back</Button>
        </>
    )
}

export default Location