"use client";

import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";

interface Keyword {
  word: string;
  definition: string;
}

export default function TableOfContentsModal({ keywords }: { keywords: Keyword[] }) {
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
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Table des matières</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mot-clé</th>
                <th>Définition</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((keyword, index) => (
                <tr key={index}>
                  <td>{keyword.word}</td>
                  <td>{keyword.definition}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}
