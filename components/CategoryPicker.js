import { Menu, UnstyledButton, createStyles, Group, Image, Text, Box } from "@mantine/core"
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons";
import { useRouter } from "next/router";

const useStyles = createStyles((theme, { opened }) => ({
  control: {
    width: 200,
    display: 'flex',
    justifyContent: 'space-between',
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
    fontSize: theme.fontSizes.sm,
    textTransform: 'capitalize'
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));



const CategoryPicker = ({ opened, setOpened, selected }) => {

  // const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const router = useRouter();

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing='xs'>
            {/* <Image src={categoryImages[selected]} height={16} width={16} radius='xl' alt={selected} /> */}
            <span className={classes.label}>{selected}</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon}  />
        </UnstyledButton>
      </Menu.Target>
      
      <Menu.Dropdown>
        <Menu.Label>Foils</Menu.Label>
        <Menu.Item>
          Foil Kits
        </Menu.Item>
        <Menu.Item>
          Front Wings
        </Menu.Item>
        <Menu.Item>
          Tail Wings
        </Menu.Item>
        {/* {
          productCategories.map((category, idx) => (
            <Menu.Item 
              key={idx}
              onClick={() => router.push(`/products/category/${category}`)}
              // icon={<Image src={categoryImages[category]} height={16} width={16} radius='xl' alt={category} />}
              sx={{textTransform: 'capitalize'}}
            >
              {category}
            </Menu.Item>
          ))
        } */}
      </Menu.Dropdown>
    </Menu>
  )

}

export default CategoryPicker