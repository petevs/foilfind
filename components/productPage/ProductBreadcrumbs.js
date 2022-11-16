import Link from 'next/link'
import React from 'react'
import { Breadcrumbs, Container, Text } from '@mantine/core'

const ProductBreadcrumbs = ({category}) => {

  const items = [
    { title: 'Products', href: '/products' },
    { title: category, href: `/products/category/${category}`}
  ].map((item, index) => (
    <Link key={index} href={item.href} passHref>
      <Text component='a' transform='capitalize'>
        {item.title}
      </Text>
    </Link>
  ))


  return (
    <Container size='lg' pt='sm'>
      <Breadcrumbs>
        {items}
      </Breadcrumbs>
    </Container>
    
  )
}

export default ProductBreadcrumbs