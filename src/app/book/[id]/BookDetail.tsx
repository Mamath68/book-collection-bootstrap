"use client";

import {Card, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";

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

export default function BookDetail({book}: { book: Book }) {
    return (
        <Container className="mt-5">
            {book ? (
                <Row>
                    {/* Image du livre */}
                    <Col md={4}>
                        <Card.Img
                            src={book.img}
                            alt={`Couverture de ${book.title}`}
                            style={{height: "48rem", objectFit: "contain"}}
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
                                {
                                    book.commentaire &&
                                    <Card.Text>
                                        <strong>Commentaire :</strong> {book.commentaire}
                                    </Card.Text>
                                }
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Publié VO : {book.published_vo}</ListGroupItem>
                                <ListGroupItem>Publié VF : {book.published_vf}</ListGroupItem>
                                <ListGroupItem>Fin publication VO : {book.end_published_vo}</ListGroupItem>
                                <ListGroupItem>Fin publication VF : {book.end_published_vf}</ListGroupItem>
                                <ListGroupItem>Quantité possédée : {book.quantite_possede}</ListGroupItem>
                                <ListGroupItem>Volumes possédés : {book.volumes_possede}</ListGroupItem>
                                <ListGroupItem>Total volumes VO : {book.volumes_total_vo}</ListGroupItem>
                                <ListGroupItem>Total volumes VF : {book.volumes_total_vf}</ListGroupItem>
                                <ListGroupItem>Status VO : {book.status_vo}</ListGroupItem>
                                <ListGroupItem>Status VF : {book.status_vf}</ListGroupItem>
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
