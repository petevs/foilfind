import { Box, Button } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons'


const SidebarToggle = ({showList, setShowList}) => {


  const toggleButton = (theme) => ({
    position: 'absolute',
    top: `calc(${theme.other.headerHeight}px + 10px)`,
    left: showList ? '385px' : '10px',
    zIndex: 5,
  })

  return (
    <Box sx={toggleButton}>
      <Button
        variant='default' 
        color='gray' 
        radius='md' 
        sx={{padding: '0 14px', boxShadow: 'rgb(0 0 0 / 12%) 0px 6px 16px'}}
        onClick={() => setShowList(!showList)}
        leftIcon={
          showList ?
          <IconChevronLeft size={16} />
          : <IconChevronRight size={16} />
      }
      >
        {showList ? 'Hide list' : 'Show list'}
      </Button>
    </Box>
  )
}

export default SidebarToggle