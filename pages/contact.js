import Head from "next/head"
import { GetInTouchSimple } from "../components/GetInTouchSimple"

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact</title>
                <meta name="description" content="Contact" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <GetInTouchSimple />
            </main>
        </>
    )
}
