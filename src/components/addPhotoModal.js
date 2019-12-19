import React from 'react'
import {Button, Modal, Form, Row, Col} from "react-bootstrap";

function AddPhotoModal(props) {
    const { show, onClose } = props;

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление фото</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formPhotoTitle">
                        <Form.Label column sm="2">
                            Название
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text"/>
                        </Col>
                        <Form.Label column sm="2">
                            Файл
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="file"/>
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

export default AddPhotoModal