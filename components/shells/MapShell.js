import ShellHeader from "./ShellHeader";
import { Box, Divider, Text} from "@mantine/core";
import Link from "next/link";
import ShellFooter from "./ShellFooter";

export default function MapShell({children}){
  return(
<>
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateRows: `${theme.other.headerHeight}px calc(100vh - ${theme.other.headerHeight}px)`,
        })}
      >
          <ShellHeader 
            fixed={true}
          />
          <Box component='main'>
            {children}
          </Box>

      </Box>
      <ShellFooter />
    </>
  )
}