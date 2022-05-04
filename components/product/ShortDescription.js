import parse from 'html-react-parser'
import { Box, Button, Divider, Spoiler, Text, UnstyledButton } from '@mantine/core'

const ShortDescription = ({ description }) => {

    const style = {
        height: '175px',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
    }

    return (
        <Box>
            <Divider mt='lg' />
            <Box sx={style}>
                {parse(description)}
            </Box>
            <UnstyledButton mt='sm'>
                <Text underline weight={500}>Show More &gt;</Text>
            </UnstyledButton>
        </Box>
    )
}

export default ShortDescription