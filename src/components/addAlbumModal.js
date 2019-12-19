import React from 'react'
import {Button, Modal, Form, Row, Col} from "react-bootstrap";

function AddAlbumModal(props) {
    const { show, onClose } = props;

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание альбома</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formAlbumTitle">
                        <Form.Label column sm="2">
                            Название
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text"/>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onClose}>
                        Ок
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddAlbumModal