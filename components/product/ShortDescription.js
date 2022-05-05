import parse from 'html-react-parser'
import { Box, Button, Divider, Modal, Spoiler, Text, UnstyledButton } from '@mantine/core'
import { useState } from 'react'

const ShortDescription = ({ description }) => {


    const [isOpen, setIsOpen] = useState(false)

    const style = {
        height: '175px',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
    }


    const openModal = () => setIsOpen(true)

    return (
        <>
            <Modal
                opened={isOpen}
                onClose={() => setIsOpen(false)}
                centered
                overflow='inside'
                size='xl'
                p='lg'
                transition='slide-up'
            >
                {parse(description)}
            </Modal>
            <Box>
                <Divider mt='lg' />
                <Text weight={900} size='xl' mt='md'>Brand Description</Text>
                <Box sx={style}>
                    {parse(description)}
                </Box>
                <UnstyledButton mt='sm' onClick={openModal}>
                    <Text underline weight={500}>Show More &gt;</Text>
                </UnstyledButton>
            </Box>
        </>
    )
}

export default ShortDescription