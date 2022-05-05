import { Button, Group, Table, Avatar, Text, UnstyledButton, Center, Box } from "@mantine/core"

const CompareTable = () => {

    const mockData = [
        {price: '$1,949.99 USD', dealer: 'RealWatersports.com', logoSrc: 'https://cdn.shopify.com/s/files/1/2062/5873/files/logo_white_v12_x220.png?v=1522987169', link: 'https://www.realwatersports.com/products/armstrong-fg-wing-sup-foilboard'},
        {price: '$2,434.99 CAD', dealer: 'KiteForce.ca', logoSrc: 'https://kiteforce.ca/img/kiteforce-logo-1538621163.jpg', link: 'https://kiteforce.ca/en/rigides/3823-50552-armstrong-fg-wing-sup-board.html'},
        {price: '$1,949.00 USD', dealer: 'BigWinds.com', logoSrc: 'https://d2g8h9w8.rocketcdn.me/wp-content/uploads/2020/10/BW_LOGO_horizontal_185.jpg', link: 'https://bigwinds.com/products/armstrong-fg-sup-foil-board/'},

    ]


    const rows = mockData.map((item, index) => (
        <tr key={index}>
            <td>
                <UnstyledButton>
                    <Text weight={600}>
                        {item.price}
                    </Text>
                </UnstyledButton>
            </td>
            <td>
                <UnstyledButton>
                    <Group spacing="sm">
                        <Avatar size={30} src={item.logoSrc} radius={30} sx={{backgroundColor: '#D40101'}} />
                        <Text size="sm" weight={500}>
                            {item.dealer}
                        </Text>
                    </Group>
                </UnstyledButton>
            </td>
            <td>
                <Group position='right'>
                    <Button
                        size='xs'
                        radius='lg'
                        variant='light'
                        component='a'
                        href={item.link}
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        View Deal
                    </Button>
                </Group>
            </td>
        </tr>
    ))

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>Dealer</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
            <Box sx={(theme) => ({backgroundColor: theme.colors.gray[0], border: `1px solid ${theme.colors.gray[3]}`, borderRadius: theme.radius.md})} p='md' mt='md'>
                <Text align='center' size='sm' weight={500}>Do you sell this item?</Text>
                <Center>
                    <Button size='xs' mt='xs' radius='md'>List Your Store Here</Button>
                </Center>
            </Box>
            <Text size='lg' mt='lg' weight={500}>Compare Used</Text>
            <Text size='sm'>None currently for sale</Text>
            <Box sx={(theme) => ({backgroundColor: theme.colors.gray[0], border: `1px solid ${theme.colors.gray[3]}`, borderRadius: theme.radius.md})} p='md' mt='md'>
                <Text align='center' size='sm' weight={500}>Selling a used one?</Text>
                <Center>
                    <Button size='xs' mt='xs' radius='md'>List Your Item Here</Button>
                </Center>
            </Box>
        </>
    )
}

export default CompareTable