import { Card, Select, Text, Button, Divider, Group, createStyles } from "@mantine/core"
import { useState } from "react"
import Compare from "./Compare"


const useStyles = createStyles((theme) => ({
    root: {
      position: 'relative',
    },
  
    input: {
      height: 'auto',
      paddingTop: 18,
    },
  
    label: {
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: theme.fontSizes.xs,
      paddingLeft: theme.spacing.sm,
      paddingTop: theme.spacing.sm / 2,
      zIndex: 1,
    },
  }));


const PriceBox = ({ product }) => {

    const [size, setSize] = useState("4'8 x 22.5\" x 3\" Vol: 50L")

    const { classes } = useStyles();

    return (
        <Card shadow='xl' withBorder radius='md' p='xl'>
            <Group position='apart' sx={{alignItems: 'baseline'}}>
                <Text size='xl' weight={500}>$1,999 - $2,495</Text>
                <Text color='dimmed' size='xs'>8 Reviews</Text>
            </Group>
            <Text size='xs' mt='xs' color='green'>In Stock</Text>
            <Select
                size='xs'
                value={size}
                onChange={setSize}
                style={{ marginTop: 10, zIndex: 2 }}
                classNames={classes}
                label='Board Size'
                data={[
                    { value: "4'8 x 22.5\" x 3\" Vol: 50L", label: "4'8 x 22.5\" x 3\" Vol: 50L" },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                ]}
            />
            <Compare 
                product={product}
            />
        </Card>
    )
}

export default PriceBox