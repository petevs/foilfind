import { Accordion, Box, Stack, Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

const FooterList = ({ title, items, sx}) => {


    const mobile = useMediaQuery('(max-width: 1024px)');

    if(mobile){
        return(
            <Accordion sx={{margin: '0 -1rem', '& .mantine-Accordion-content': { borderTop: '1px solid #dee2e6', paddingTop: '1rem', paddingBottom: '1rem'}}}>
                <Accordion.Item label={title}>
                    <Stack>
                        {items.map((item, index) => (
                            <Text key={index}>
                                {item.title}
                            </Text>
                        ))}
                    </Stack>
                </Accordion.Item>
            </Accordion>
        )
    }

    return (
        <Box 
            p='md'
            sx={{...sx}}
        >
            <Text
                size='lg'
                weight={900}
                mb='xs'
            >
                {title}
            </Text>
            {
                items.map((item, index) => (
                    <>
                        <Text
                            key={index}
                            size='md'
                            color='dimmed'
                        >
                            {item.title}
                        </Text>
                    </>
                ))
            }
        </Box>
    )
}

export default FooterList