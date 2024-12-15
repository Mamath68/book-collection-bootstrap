"use client";

import {useRouter, usePathname} from "next/navigation";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Tabs
            id="navbar-tabs"
            activeKey={pathname} // Active l'onglet correspondant à l'URL actuelle
            onSelect={(key) => key && router.push(key)} // Navigue vers la route sélectionnée
            className="mb-3"
            fill
        >
            <Tab eventKey="/home" title="Accueil"/>
            <Tab eventKey="/book" title="Livres"/>
        </Tabs>
    );
}
