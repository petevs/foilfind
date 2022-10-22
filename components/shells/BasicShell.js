import { Box } from "@mantine/core";
import ShellFooter from "./ShellFooter";
import ShellHeader from "./ShellHeader";

export default function BasicShell({children}){
  return (
    <>
      <ShellHeader />
      <Box>
        <div>
          {children}
        </div>
        <ShellFooter />
      </Box>
    </>
  )
}