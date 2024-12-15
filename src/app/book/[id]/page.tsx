"use client";

import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import {Card, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
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
    end_publication_vo: number;
    end_publication_vf: number;
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
    const {id} = useParams(); // Utilisation d’useParams pour récupérer l'ID du livre

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
        if (book) {
            document.title = `${book.title}`; // Mise à jour du titre de la page
        }
    }, [id, book]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container className="mt-5">
            {book ? (
                <Row className="d-flex align-items-center">
                    {/* Image du livre */}
                    <Col xs={12} md={4} className="mb-4 mb-md-0">
                        <Card.Img
                            src={book.img}
                            alt={`Couverture de ${book.title}`}
                            style={{height: "48rem", objectFit: "contain"}}
                            className="img-fluid"
                        />
                    </Col>

                    {/* Détails du livre */}
                    <Col xs={12} md={8}>
                        <Card className="h-100">
                            <Card.Body>
                                {/* Titre et sous-titre */}
                                <Row>
                                    <Col xs={12}>
                                        <Card.Title className="mb-4">{book.title}</Card.Title>
                                        <Card.Subtitle className="mb-3 text-muted">Auteur
                                            : {book.author}</Card.Subtitle>
                                    </Col>
                                </Row>

                                {/* Informations principales */}
                                <Row className="mb-4">
                                    {book.original_author && (
                                        <Col xs={12} md={6}>
                                            <Card.Text>Auteur original : {book.original_author}</Card.Text>
                                        </Col>
                                    )}
                                    {book.illustrator && (
                                        <Col xs={12} md={6}>
                                            <Card.Text>Illustrateur : {book.illustrator}</Card.Text>
                                        </Col>
                                    )}
                                    <Col xs={12} md={6}>
                                        <Card.Text>Éditeur : {book.editeur}</Card.Text>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Card.Text>Type : {book.type}</Card.Text>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Card.Text>Genre : {book.genre}</Card.Text>
                                    </Col>
                                    {book.commentaire && (
                                        <Col xs={12}>
                                            <Card.Text>
                                                <strong>Commentaire :</strong> {book.commentaire}
                                            </Card.Text>
                                        </Col>
                                    )}
                                </Row>
                            </Card.Body>

                            {/* Liste groupée des détails */}
                            <ListGroup className="list-group-flush">
                                <Row>
                                    <Col xs={12} md={6}>
                                        <ListGroupItem>Publié VO : {book.published_vo}</ListGroupItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <ListGroupItem>Publié VF : {book.published_vf}</ListGroupItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <ListGroupItem>Fin publication VO : {book.end_publication_vo}</ListGroupItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <ListGroupItem>Fin publication VF : {book.end_publication_vf}</ListGroupItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <ListGroupItem>Quantité possédée : {book.quantite_possede}</ListGroupItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <ListGroupItem>Volumes possédés : {book.volumes_possede}</ListGroupItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <ListGroupItem>Total volumes VO : {book.volumes_total_vo}</ListGroupItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <ListGroupItem>Total volumes VF : {book.volumes_total_vf}</ListGroupItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <ListGroupItem>Status VO : {book.status_vo}</ListGroupItem>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <ListGroupItem>Status VF : {book.status_vf}</ListGroupItem>
                                    </Col>
                                </Row>
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
