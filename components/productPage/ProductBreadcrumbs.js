import Link from 'next/link'
import React from 'react'
import { Breadcrumbs, Container, Text } from '@mantine/core'

const ProductBreadcrumbs = ({category, subcategory}) => {

  const items = () => {
    if(subcategory){
      return [
        { title: 'Products', href: '/products' },
        { title: category, href: `/products/category/${category}`},
        { title: subcategory, href: `/products/category/${category}/${subcategory}`}
      ]
    }

    return [
      { title: 'Products', href: '/products' },
      { title: category, href: `/products/category/${category}`}
    ]
}



  return (
    <Container size='lg' pt='sm'>
      <Breadcrumbs>
        {items().map((item, index) => (
          <Link key={index} href={item.href} passHref>
            <Text component='a' transform='capitalize'>
              {item.title}
            </Text>
          </Link>
  ))}
      </Breadcrumbs>
    </Container>
    
  )
}

export default ProductBreadcrumbs