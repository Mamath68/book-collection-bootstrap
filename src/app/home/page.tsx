import Link from "next/link";

import type {Metadata} from 'next'

export const metadata: Metadata = {
    title: 'Accueil',
    description: "Page D'accueil",
}

export default function Home() {
    return (
        <Link href="/book">Vers les livres</Link>
    );
}
