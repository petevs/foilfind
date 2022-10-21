import { Box, Divider, Text } from "@mantine/core"
import Link from "next/link"


export default function ShellFooter(){
  return (
    <Box component='footer'>
    <Divider />
    <Box sx={(theme) => ({display: 'grid', gridAutoFlow: 'column', gap: '1rem', justifyContent: 'start', padding: `${theme.spacing.md}px`})}>
      <Text color='dimmed'>© 2022 Foil Find. All rights reserved.</Text>
      <Link href='/privacy'>Privacy</Link>
      <Link href='/terms'>Terms</Link>
    </Box>
  </Box>
  )
}