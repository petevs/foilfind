import { UnstyledButton, Group, Text, ThemeIcon, useMantineColorScheme } from '@mantine/core';
import { useRouter } from 'next/router';

const NavItem= (props) => {

    const router = useRouter()
    const active = router.asPath === props.path

    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const style = (theme) => ({
        width: '100%',
        padding: `${theme.spacing.xs}px`,
        borderRadius: `${theme.radius.sm}px`,
        backgroundColor: active ? (dark ? theme.colors.dark[6] : theme.colors.gray[0]) : 'none',
        ':hover': {
            backgroundColor: dark ? theme.colors.dark[6] : theme.colors.gray[0]
        },
        ...props.sx
    })


    const handleClick = () => {
        dispatch(toggleNav(false))
        router.push(props.path)
    }

  return (
    <UnstyledButton 
        sx={style} 
        onClick={() => handleClick()}
    >
        <Group>
        <ThemeIcon size='sm' variant='outline'>
            {props.icon}
        </ThemeIcon>
        <div>
            <Text
                color={(!dark && active) && 'blue'}
                size='sm'
            >
                {props.title}
            </Text>
        </div>
        </Group>
  </UnstyledButton>
  )
}

export default NavItem