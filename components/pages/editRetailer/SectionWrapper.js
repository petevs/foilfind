import { Box } from "@mantine/core"

const SectionWrapper = ({children}) => {
  return(
    <Box 
      sx={{
        display: 'grid', 
        gridTemplateColumns: '1fr 3fr', 
        gap: '2rem',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
          gap: '0'
        }
      }}
    >
      {children}
    </Box>
  )
}

export default SectionWrapper