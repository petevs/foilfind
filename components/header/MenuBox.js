import { ActionIcon, Box, Button, Indicator, Text } from "@mantine/core"
import { Bell, Heart } from "tabler-icons-react"

const MenuBox = ({ desktop }) => {

    const style = (theme) => ({
        gridArea: 'menu',
        display: 'grid',
        alignContent: 'center',
        alignItems: 'center',
        gridAutoFlow: 'column',
        gap: '.75rem',
        padding: '1rem',
        '@media (max-width: 1024px)': {
            justifyContent: 'end'
        }
    })

    return (
        <Box sx={style}>
            
                <ActionIcon
                    variant='transparent'
                >
                    <Indicator label='3' color='red' size={15} sx={{fontWeight: 700}}>
                        <Bell 
                            fill='#495057'
                            color='white'
                            stroke={1}
                        />
                    </Indicator>
                </ActionIcon>
            <ActionIcon
                variant='transparent'
            >
                <Heart 
                    fill='#495057'
                    color='white'
                    stroke={1}
                />
            </ActionIcon>
            {
                desktop && 
                <>
                    <Text
                        size='sm'
                        weight={500}
                    >
                        Log in
                    </Text>
                    <Button
                        size='sm'
                        radius='lg'
                        variant='light'
                    >
                        Sign up
                    </Button>
                </>
            }
        </Box>
    )
}

export default MenuBox