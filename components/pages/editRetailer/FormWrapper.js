import { Paper, Box, Button } from "@mantine/core"

const FormWrapper = ({children, disabled, reset, onSave}) => {
  return(
    <Paper shadow='sm' withBorder>
    <Box p='xl'>
      {children}
    </Box>
    <Box sx={(theme) => ({display: 'grid', gridTemplateColumns: '1fr 1fr', padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`, backgroundColor: theme.colors.gray[1]})}>
          <Button sx={{justifySelf: 'start'}} variant='subtle' color='dark' onClick={reset}>Reset</Button>
          <Button sx={{justifySelf: 'end'}} disabled={disabled} color='violet' onClick={onSave}
          >Save</Button>
    </Box>
  </Paper>
  )
}

export default FormWrapper