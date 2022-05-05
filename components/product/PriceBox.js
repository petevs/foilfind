import { Card, Select, Text, Button, Divider, Group } from "@mantine/core"
import { useState } from "react"

const PriceBox = () => {

    const [size, setSize] = useState("4'8 x 22.5\" x 3\" Vol: 50L")

    return (
        <Card shadow='xl' withBorder radius='md' p='xl'>
            <Group position='apart' sx={{alignItems: 'baseline'}}>
                <Text size='xl' weight={500}>$1,999 - $2,495</Text>
                <Text color='dimmed' size='xs'>8 Reviews</Text>
            </Group>
            <Text size='xs' mt='xs' color='green'>In Stock</Text>
            <Select
                mt='xs'
                size='xs'
                value={size}
                onChange={setSize}
                data={[
                    { value: "4'8 x 22.5\" x 3\" Vol: 50L", label: "4'8 x 22.5\" x 3\" Vol: 50L" },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                ]}
            />
            <Button fullWidth mt='md' color='blue' radius='md' size='md'>Compare Prices</Button>
        </Card>
    )
}

export default PriceBox