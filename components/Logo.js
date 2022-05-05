import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core"
import FoilIcon from "./FoilIcon"

const Logo = () => {
    return (
            <Group spacing='xs'>
                <ThemeIcon variant="outline" radius="xl" size="md" color='dark' sx={{border: '1.75px solid #25262b'}}>
                    <FoilIcon />
                </ThemeIcon>
                <Text weight={900} size='xl'>Foil Find</Text>
            </Group>
    )
}

export default Logo