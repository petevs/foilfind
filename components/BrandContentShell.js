import { Container, Box } from "@mantine/core"

export default function BrandContentShell(props){
  return (
    <Container size='xl'>
      <Box sx={(theme) => ({ minHeight: `calc(100vh - ${theme.other.headerHeight}px - 300px)` })} py='xl'>
        {props.children}
      </Box>
    </Container>
  )
}