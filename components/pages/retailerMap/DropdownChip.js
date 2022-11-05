import { Menu, UnstyledButton, Box } from "@mantine/core"
import { useState } from "react"
import { IconChevronDown, IconChevronUp } from "@tabler/icons"

const DropdownChip = ({ label, children, active }) => {

  const [opened, setOpened] = useState(false)

  return (
    <Menu opened={opened} onChange={setOpened}>
        <Menu.Target>
            <UnstyledButton
                sx={(theme) => ({
                    fontSize: theme.fontSizes.sm,
                    border: '1px solid',
                    borderColor: active ? theme.colors.dark[5] : theme.colors.dark[0],
                    padding: `0 ${theme.spacing.md}px`,
                    borderRadius: theme.radius.xl,
                    backgroundColor: opened ? theme.colors.dark[5] : 'white',
                    color: opened ? 'white' : theme.colors.dark[5],
                    marginTop: '2px'
                })}
            >
                <Box
                    sx={{display: 'grid', gridAutoFlow: 'column', alignItems: 'center', gap: '.25rem'}}
                >
                {label}
                {
                    opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                }
                </Box>
            </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
            {children}
        </Menu.Dropdown>
    </Menu>
  )
}

export default DropdownChip