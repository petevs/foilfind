import { Menu, UnstyledButton, createStyles, Box, Text } from "@mantine/core"
import { NextLink } from "@mantine/next"
import { IconChevronDown } from "@tabler/icons";
import { useState } from "react";

const useStyles = createStyles((theme, { opened }) => ({
  control: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    justifyContent: 'start',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: 'background-color 150ms ease',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.md,
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));

const OtherSizeSelect = ({current, products}) => {

  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });


  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      mt='sm'
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Text sx={{gridColumn: '1 / 3'}} size='xs' pb={2.5} weight={400}>Other Sizes</Text>
          <span className={classes.label}>{current}</span>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {
          products.map((product, index) => (
            <Menu.Item key={index} component={NextLink} href={`/products/${product.path}`}>
              {product.name}
            </Menu.Item>
          ))
        }
      </Menu.Dropdown>
    </Menu>
  )
}

export default OtherSizeSelect