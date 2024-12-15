"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import axios from "axios";

interface Book {
    id: string;
    title: string;
    author: string;
    original_author?: string;
    illustrator?: string;
    editeur: string;
    img: string;
    type: string;
    genre: string;
    published_vo: number;
    published_vf: number;
    end_published_vo: number;
    end_published_vf: number;
    quantite_possede: number | string;
    volumes_possede: number | string;
    volumes_total_vo: number;
    volumes_total_vf: number;
    status_vo: string;
    status_vf: string;
    commentaire: string;
}

export default function BookDetail() {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams(); // Utilisation de useParams pour récupérer l'ID du livre

    useEffect(() => {
        if (id) {
            // Chargement des données à partir de books.json
            axios
                .get("/books.json")
                .then((response) => {
                    const foundBook = response.data.find((b: { id: string }) => b.id === id);
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
    }, [id]);

    useEffect(() => {
        if (book) {
            document.title = `${book.title}`; // Mise à jour du titre de la page
        }
    }, [book]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container className="mt-5">
            {book ? (
                <Row>
                    {/* Image du livre */}
                    <Col md={4}>
                        <Card.Img
                            src={book.img}
                            alt={`Couverture de ${book.title}`}
                            style={{ height: "48rem", objectFit: "contain" }}
                        />
                    </Col>

                    {/* Détails du livre */}
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="mb-4">{book.title}</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">Auteur : {book.author}</Card.Subtitle>
                                {book.original_author && <p>Auteur original : {book.original_author}</p>}
                                {book.illustrator && <p>Illustrateur : {book.illustrator}</p>}
                                <Card.Text>Éditeur : {book.editeur}</Card.Text>
                                <Card.Text>Type : {book.type}</Card.Text>
                                <Card.Text>Genre : {book.genre}</Card.Text>
                                {book.commentaire && (
                                    <Card.Text>
                                        <strong>Commentaire :</strong> {book.commentaire}
                                    </Card.Text>
                                )}
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Publié VO : {book.published_vo}</ListGroup.Item>
                                <ListGroup.Item>Publié VF : {book.published_vf}</ListGroup.Item>
                                <ListGroup.Item>Fin publication VO : {book.end_published_vo}</ListGroup.Item>
                                <ListGroup.Item>Fin publication VF : {book.end_published_vf}</ListGroup.Item>
                                <ListGroup.Item>Quantité possédée : {book.quantite_possede}</ListGroup.Item>
                                <ListGroup.Item>Volumes possédés : {book.volumes_possede}</ListGroup.Item>
                                <ListGroup.Item>Total volumes VO : {book.volumes_total_vo}</ListGroup.Item>
                                <ListGroup.Item>Total volumes VF : {book.volumes_total_vf}</ListGroup.Item>
                                <ListGroup.Item>Status VO : {book.status_vo}</ListGroup.Item>
                                <ListGroup.Item>Status VF : {book.status_vf}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <p>Aucun détail trouvé pour ce livre.</p>
            )}
        </Container>
    );
}
