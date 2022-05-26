import { ActionIcon, Box, Group, Text } from "@mantine/core";
import { BrandFacebook, BrandInstagram, BrandTiktok, BrandTwitter, BrandYoutube } from "tabler-icons-react";
import FoilFindLogo from "../FoilFindLogo";

const FooterHeader = (props) => {

    const style = (theme) => ({
        display: 'grid',
        gridTemplateColumns: '1fr',
        alignContent: 'start',
        '@media (max-width: 1024px)': {
            justifyItems: 'center',
            textAlign: 'center'
        }
    })

    return(
        <Box sx={style}>
            <FoilFindLogo 
                    width='150'
            />
            <Text
                size='sm'
                color='dimmed'
            >
                A community connecting wing foiling riders, retailers, coaches, brands and more.
            </Text>
            <Group mt='md'>
                <ActionIcon>
                    <BrandTwitter />
                </ActionIcon>
                <ActionIcon>
                    <BrandFacebook />
                </ActionIcon>
                <ActionIcon>
                    <BrandInstagram />
                </ActionIcon>
                <ActionIcon>
                    <BrandYoutube />
                </ActionIcon>
                <ActionIcon>
                    <BrandTiktok/>
                </ActionIcon>
            </Group>
        </Box>
    )
}

export default FooterHeader;