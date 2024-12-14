"use client";

import {Card, Row, Col} from "react-bootstrap";
import {useEffect, useState} from "react";
/*
import Link from "next/link";
*/
import axios from "axios";

interface Book {
    id: number;
    title: string;
    img: string;
}

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]); // Type explicite pour l'état books
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Utilisation d'Axios pour récupérer les livres
        axios
            .get("books.json")
            .then((response) => {
                setBooks(response.data); // Mets à jour l'état avec les données des livres
                setLoading(false); // Termine le chargement
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des livres :", error);
                setLoading(false); // Termine le chargement en cas d'erreur
            });
    }, []);

    if (loading) return <p className="text-center mt-10">Chargement...</p>;
    return (
        <div className="container">
            <h1>Ma Collection de Livres</h1>
            <Row>
                {books.map((book) => (
                    <Col md={3} sm={6} key={book.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" width={25} height={450} src={book.img}/>
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
