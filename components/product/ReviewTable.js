import { Button, Group, Table, Avatar, Text, UnstyledButton, Center, Box } from "@mantine/core"
import { CurrencySelect } from "./CurrencySelect"
import { BsStarFill, BsStarHalf } from "react-icons/bs"

const ReviewTable = () => {

    const mockData = [
        {numOfReviews: '8 Reviews', dealer: 'RealWatersports.com', logoSrc: 'https://cdn.shopify.com/s/files/1/2062/5873/files/logo_white_v12_x220.png?v=1522987169', link: 'https://www.realwatersports.com/products/armstrong-fg-wing-sup-foilboard#shopify-product-reviews'},

    ]

    const rating = 5

    const handleRating = ( rating ) => {
        return [...Array(rating).keys()]
    }

    const rows = mockData.map((item, index) => (
        <tr key={index}>
            <td>
                <UnstyledButton>
                    {
                        handleRating(rating).map( (item, index) => (
                        <BsStarFill />
                        ))
                    }
                </UnstyledButton>
            </td>
            <td>
                <UnstyledButton>
                    <Text weight={600}>
                        {item.numOfReviews}
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
                        Read Reviews
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
                        <th>Rating</th>
                        <th># of Reviews</th>
                        <th>Dealer</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </>
    )
}

export default ReviewTable