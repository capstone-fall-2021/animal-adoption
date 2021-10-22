import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

const websiteName = "Animal Adoption Dating App"

export default function Layout({children, home}) {
    return <div>
        <header>
            {home ? (
                <h1>{websiteName}</h1>
            ): (
                <h1>not home</h1>
            )}
        </header>

    </div>
}