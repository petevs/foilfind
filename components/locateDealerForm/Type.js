import Headline from "./Headline"
import { Button, Group, UnstyledButton } from "@mantine/core"
import TypeCard from "./TypeCard"
import { BsShop } from "react-icons/bs"
import { MdOutlineAddShoppingCart } from "react-icons/md"

const Type = ({nextStep}) => {

    return (
        <>
            <Headline
                title='Lets get started...'
            />
            <Group>
            <UnstyledButton onClick={() => nextStep()}>
                <TypeCard
                    icon={<BsShop />}
                    title='Physical'
                    subtitle='Pick-up in person'
                />
            </UnstyledButton>
                <UnstyledButton onClick={() => nextStep()}>
                    <TypeCard
                        icon={<MdOutlineAddShoppingCart />}
                        title='Online'
                        subtitle='Order online'
                    />
                </UnstyledButton>
            </Group>
        </>
    )
}

export default Type