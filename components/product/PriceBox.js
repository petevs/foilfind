import { Card, Select, Text, Button, Divider } from "@mantine/core"

const PriceBox = () => {

    return (
        <Card shadow='xl' withBorder radius='md' p='xl'>
            <Text size='xl' weight={500}>$1,999 - $2,495</Text>
            <Divider mt='md' mb='md' />
            <Select
                label="Size"
                data={[
                    { value: 'react', label: 'React' },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                ]}
            />
            <Button fullWidth mt='md' color='red'>Compare Prices</Button>
        </Card>
    )
}

export default PriceBox