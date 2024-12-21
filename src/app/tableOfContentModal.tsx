"use client";

import React, {useState} from "react";
import {Button, Modal, Table} from "react-bootstrap";

export default function TableOfContentsModal({keywords}: { keywords: string[] }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/* Bouton pour ouvrir le modal */}
            <Button variant="primary" onClick={handleShow} className="position-fixed bottom-0 end-0 m-3">
                Table des matières
            </Button>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-black">Table des matières</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Mot-clé</th>
                        </tr>
                        </thead>
                        <tbody>
                        {keywords.map((keyword, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{keyword}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    );
}
