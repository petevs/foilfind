import { Box } from "@mantine/core"

const HideMobileBox = ({children}) => {
  return (
    <Box
      sx={{
        '@media (max-width: 1024px)': {
          display: 'none'
        }}
        }
    >
    {children}
  </Box>
  )
}

export default HideMobileBox