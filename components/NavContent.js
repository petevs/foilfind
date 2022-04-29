
//ICONS
import { FaHotel, FaShoppingCart, FaBookOpen } from "react-icons/fa"
import { GiTeacher } from "react-icons/gi"
import { MdCalendarToday, MdQuiz, MdSell, MdStoreMallDirectory, MdOutlineViewList } from "react-icons/md"


import NavItem from "./NavItem"
import { Divider } from "@mantine/core"


const NavContent = ({ isOpen }) => {

    return (
        <>
                <Divider mt='sm' mb='sm' />
                <NavItem 
                    title='Gear Directory'
                    icon={<MdOutlineViewList />}
                    showText={isOpen}
                />
                <NavItem 
                    title='Used Marketplace'
                    icon={<MdSell />}
                    showText={isOpen}
                />
                <NavItem 
                    title='Rentals'
                    icon={<MdSell />}
                    showText={isOpen}
                />
                <NavItem 
                    title='Brands'
                    icon={<MdSell />}
                    showText={isOpen}
                />
                <Divider mt='sm' mb='sm' />
                <NavItem 
                    title='Help Me Choose'
                    icon={<MdQuiz />}
                    showText={isOpen}
                    path='/help-me-choose'
                />
                <NavItem 
                    title='Locate a Dealer'
                    icon={<MdStoreMallDirectory />}
                    showText={isOpen}
                    path='/dealers/choose-type'
                />
                <NavItem 
                    title='Windy Stays'
                    icon={<FaHotel />}
                    showText={isOpen}
                />
                <NavItem 
                    title='Lessons'
                    icon={<GiTeacher />}
                    showText={isOpen}
                />
                <Divider mt='sm' mb='sm' />
                <NavItem 
                    title='The Daily Five'
                    icon={<MdCalendarToday />}
                    showText={isOpen}
                />
                <NavItem 
                    title='Knowledge Base'
                    icon={<FaBookOpen />}
                    showText={isOpen}
                />
        </>
    )
}

export default NavContent