import Shell from "../components/Shell"
import { Text, Box, MultiSelect, Slider, RangeSlider, Select, RadioGroup, Radio } from "@mantine/core"

const HelpMeChoose = () => {

    const wrapper = (theme) => ({
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'center',
        backgroundColor: '#f5f5f5',
        height: '100%'
    })

    const headline = (theme ) => ({
        fontSize: '50px',
        fontWeight: 900,
        marginBottom: theme.spacing.xl
    })

    const form = (theme) => ({
        width: '450px',
        display: 'grid',
        gap: '2rem'
    })



    const gearTypes = [
        { value: 'wing', label: 'Wing' },
        { value: 'foil', label: 'Foil' },
        { value: 'board', label: 'Board' },
    ]

    return(
        <Shell>
            <Box sx={wrapper}>
                <Text>Shopping Tool</Text>
                <Text sx={headline}>Help Me Choose Quiz</Text>
                <Box sx={form}>
                    <MultiSelect
                        data={gearTypes}
                        label='Which gear do you need help choosing?'
                    />
                    <Box>
                        <Text size='sm' weight={500} mb='xs'>How much do you weigh?</Text>
                        <Slider label={(value) => `${value} lbs`} mt='sm' />
                        <RadioGroup size='sm' mt='xs'>
                            <Radio value="react" label="React">kg</Radio>
                            <Radio value="svelte" label="Svelte">lbs</Radio>
                        </RadioGroup>
                    </Box>
                    <Box>
                        <Text size='sm' weight={500} mb='xs'>What kind of winds will you mostly be riding in?</Text>
                        <RangeSlider label={(value) => `${value} knots`} />
                        <RadioGroup size='sm' mt='xs'>
                            <Radio value="react" label="React">km/h</Radio>
                            <Radio value="react" label="React">kts</Radio>
                            <Radio value="svelte" label="Svelte">m/s</Radio>
                            <Radio value="svelte" label="Svelte">mph</Radio>
                        </RadioGroup>
                    </Box>
                </Box>
            </Box>
        </Shell>
    )
}

export default HelpMeChoose