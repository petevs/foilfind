import FooterList from "./FooterList"

const About = () => {

    const items = [
        {title: 'Company'},
        {title: 'Help Center'},
        {title: 'Contact'},
    ]

    return (
        <FooterList
            title='About'
            items={items}
        />
    )
}

export default About