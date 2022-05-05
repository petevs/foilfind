import { Skeleton, Card, Box } from "@mantine/core"

const UsedProductCard = () => {

    const skelList = [1, 2, 3 ]

    const boxStyle = (theme) => ({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem'
    })

    return (
        <Box sx={boxStyle}>
        {
            skelList.map((item, idx) => (
                <Box key={idx}>
                    <Skeleton animate={false} height={150} mb='xs' />
                    <Skeleton animate={false} height={18} width='33%' mb='xs' />
                    <Skeleton animate={false} height={14} width='75%' />
                </Box>
            ))
        }
        </Box>
    )
}

export default UsedProductCard