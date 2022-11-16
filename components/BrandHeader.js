import { Box, Overlay, Title, Container, Text, Divider, Anchor } from "@mantine/core"
import Link from "next/link";
import { useRouter } from "next/router";

export default function BrandHeader({ brand, active }) {

  const links = [
    { label: 'Products', path: '/products'},
    { label: 'Retailers', path: '/retailers'},
    { label: 'About', path: '/'},
  ]

  const router = useRouter();
  const url = router.asPath.split('/').slice(0, 3).join('/');

  return (
    <>
      <Container p='sm' size='xl'>
      
        <Title order={1} style={{marginTop: '2rem'}} >{brand}</Title>

          <Box sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: '1rem'}} mt='md'>
            {
              links.map((link) => (
                <Link href={`${url}${link.path}`} key={link.label} passHref>
                  <Text sx={(theme) => ({'&:hover': {cursor: 'pointer', color: theme.colors.blue[5]}})} size='md' weight={500} color={link.label.toLowerCase() === active ? 'blue' : 'gray'}>{link.label}</Text>
                </Link>
              ))
            }
          </Box>

        </Container>
        <Divider />
    </>
  )
}