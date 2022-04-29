import Headline from "./Headline"
import TypeCard from "./TypeCard"
import { Group } from "@mantine/core"
import { BsShop } from "react-icons/bs"
import { MdOutlineAddShoppingCart } from "react-icons/md"

const Location = () => {

    const headline = (theme ) => ({
        fontSize: '50px',
        fontWeight: 900,
        marginBottom: theme.spacing.xl
    })

    return (
        <>
            <Headline
                title='Lets get started...'
            />
            <Group>
                <TypeCard
                    icon={<BsShop />}
                    title='Physical'
                    subtitle='Pick-up in person'
                />
                <TypeCard
                    icon={<MdOutlineAddShoppingCart />}
                    title='Online'
                    subtitle='Order online'
                />
            </Group>
        </>
    )
}

export default Location