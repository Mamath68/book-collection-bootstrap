"use client";
import {useEffect, useState} from "react";

import {Card, Row, Col, Pagination, Container} from "react-bootstrap";

import axios from "axios";

interface Page {
    id: number;
    title: string;
    img: string;
}

export default function Home() {
    const [books, setBooks] = useState<Page[]>([]); // Type explicite pour l'état books
    const [loading, setLoading] = useState(true);
    const booksPerPage = 8; // Nombre de livres par page
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
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


    // Calcul des indices pour découper les livres
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(books.length / booksPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <p className="text-center mt-10">Chargement...</p>;
    return (
        <Container>
            <h1 className="text-center">Ma Collection de Livres</h1>
            <Row>
                {currentBooks.map((book) => (
                    <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} key={book.id} className="mb-4">
                        <Card.Link href={`/book/${book.id}`}>
                            <Card.Body style={{textAlign: "center"}}>
                                <Card.Title>{book.title}</Card.Title>
                            </Card.Body>
                            <Card.Img variant="top" width={25} height={450} src={book.img}/>
                        </Card.Link>
                    </Col>
                ))}
            </Row>
            {/* Pagination */}
            <Pagination className="mt-4 justify-content-center">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1}/>
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}/>

                {Array.from({length: totalPages}, (_, i) => i + 1).map((pageNumber) => (
                    <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </Pagination.Item>
                ))}

                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)}
                                 disabled={currentPage === totalPages}/>
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}/>
            </Pagination>
        </Container>
    );
}
