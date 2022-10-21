import ShellFooter from "./ShellFooter";
import ShellHeader from "./ShellHeader";

export default function BasicShell({children}){
  return (
    <>
      <ShellHeader />
      <div>
        {children}
      </div>
      <ShellFooter />
    </>
  )
}