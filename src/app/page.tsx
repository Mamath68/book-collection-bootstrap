import Link from "next/link";

import type {Metadata} from 'next'
import {Container} from "react-bootstrap";

export const metadata: Metadata = {
    title: 'Accueil',
    description: "Page D'accueil",
}

export default function Home() {
    return (
        <Container className="text-center">
            <h1>Bonjours à tous et Bienvenue sur mon site</h1>
            <h2>Ceci est ma nouvelle et dernière version de ma collection de livres.</h2>
            <h3>Je n&#39;ai pas trouvé les informations concernant les BD, où alors
                les sources ne sont pas forcement fiable ou complète. Vous ne verrez donc que les Mangas.</h3>
            <h4>Pour plus d&#39;infos concernant les BD, faudra me demander ce que j&#39;ai, et faire des recherches. Désolé</h4>
            <h5>Je vous souhaite bonne <Link href="/book" title="Lien vers les livres">navigation</Link></h5>
        </Container>
    );
}

