import { Box, Overlay, Title, Container, Text, Divider, Anchor } from "@mantine/core"
import Link from "next/link";
import { useRouter } from "next/router";

export default function BrandHeader({ brand, active }) {

  const links = [
    { label: 'About', path: '/'},
    { label: 'Products', path: '/products'},
    { label: 'Retailers', path: '/retailers'},
  ]

  const router = useRouter();
  const url = router.asPath.split('/').slice(0, 3).join('/');

  return (
    <>
      <Box sx={{
        height: '300px', 
        position: 'relative',
        backgroundImage: 'url(https://images.unsplash.com/photo-1523469409786-14311feb8e7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3216&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Overlay color="#000" opacity={0.65} zIndex={1} />
        <Box sx={{display: 'grid', height: '100%', justifyContent: 'center', alignContent: 'center', position: 'relative', zIndex: 2}}>
          <Title color='white' order={1}>{brand}</Title>
        </Box>
      </Box>
      <Container p='sm' size='xl'>
          <Box sx={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: '1rem'}}>
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