import { Menu, UnstyledButton, Box, Indicator } from "@mantine/core"
import { useState } from "react"
import { IconChevronDown, IconChevronUp } from "@tabler/icons"

const DropdownChip = ({ label, children, active }) => {

  const [opened, setOpened] = useState(false)

  console.log(label + 'is' + active)

  return (
    <Menu opened={opened} onChange={setOpened}>
        <Menu.Target>
            <Indicator label={active} showZero={false} size={22} color='dark' withBorder offset={2} >
                <UnstyledButton
                    sx={(theme) => ({
                        fontSize: theme.fontSizes.sm,
                        border: '1px solid',
                        borderColor: active ? theme.colors.dark[5] : theme.colors.dark[0],
                        padding: `0 ${theme.spacing.md}px`,
                        borderRadius: theme.radius.xl,
                        backgroundColor: opened || active ? theme.colors.dark[5] : 'white',
                        color: opened || active ? 'white' : theme.colors.dark[5],
                        marginTop: '2px'
                    })}
                >
                    <Box
                        sx={{display: 'grid', gridAutoFlow: 'column', alignItems: 'center', gap: '.25rem', height: '24px'}}
                    >
                    {label}
                    {
                        opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                    }
                    </Box>
                </UnstyledButton>
            </Indicator>
        </Menu.Target>

        <Menu.Dropdown>
            {children}
        </Menu.Dropdown>
    </Menu>
  )
}

export default DropdownChip