import Location from "./Location"
import { Box } from "@mantine/core"
import { Text } from "@mantine/core"
import Type from "./Type"
import { useState } from "react"

const DealerForm = () => {

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

    const [step, setStep] = useState(1)

    const nextStep = () => {
        setStep(step + 1)
    }

    const back = () => {
        setStep(1)
    }

    return (
        <Box sx={wrapper}>
            <Text>Locate a Dealer</Text>
            {
                step === 1 ?
                <Type nextStep={nextStep} />
                :
                <Location 
                    back={back}
                />
            }
        </Box>

    )
}

export default DealerForm