"use client"; // Indique que ce composant doit être exécuté côté client

import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import axios from "axios";
import Head from "next/head";
import {Card} from "react-bootstrap"; // Importer Head pour manipuler le titre de la page

interface Book {
    id: number;
    title: string;
    author: string;
    img: string;
    commentaire: string;
}

export default function BookDetail() {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams(); // Récupère les paramètres de l'URL
    const {id} = params; // Accède à l'ID du livre


    useEffect(() => {
        if (id) {
            axios
                .get("/books.json") // Accéder au fichier JSON local
                .then((response) => {
                    const foundBook = response.data.find((b: { id: number }) => b.id === parseInt(id as string));
                    if (foundBook) {
                        setBook(foundBook);
                    } else {
                        setError("Livre non trouvé");
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des détails du livre :", error);
                    setError("Une erreur s'est produite.");
                    setLoading(false);
                });
        }
    }, [id]); // Réexécuter l'effet chaque fois que l'ID change

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5">
            {/* Utilisation de next/head pour définir le titre de la page dynamique */}
            <Head>
                <title>{book ? book.title : "Détail du Livre"}</title>
            </Head>

            {book ? (
                <Card>
                    <Card.Img
                        src={book.img || "https://via.placeholder.com/150"}
                        alt={book.title}
                        className="card-img-top"
                        style={{height: "300px", objectFit: "cover"}}
                    />
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Auteur: {book.author}</Card.Subtitle>
                        <Card.Text>{book.commentaire}</Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <p>Livre non trouvé</p>
            )}
        </div>
    );
}
