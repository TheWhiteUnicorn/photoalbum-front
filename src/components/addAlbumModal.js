import React from 'react';
import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import * as yup from 'yup';

import { createAlbum, editAlbum } from "../store/action/actions";
import { connect } from "react-redux";
import {Formik} from "formik";

import {validateAlbumForm} from '../utils/validators/albumValidator'

const schema = yup.object({
    albumName: yup.string().required(),
});

class AddAlbumModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albumName: '',
            nameTouched: false,
            nameError: false,
        }
    }

    handleAddNewAlbum = async (formData) => {
        const { createAlbum } = this.props;
        let albumName = formData.albumName;

            try {
                await createAlbum(albumName);
                this.props.onClose();
            } catch {
                alert('Не удалось создать альбом');
            }
    };

    handleEditAlbum = async (formData) => {
        const { editAlbum, id } = this.props;
        let albumName = formData.albumName;

        const data = {
            id: id,
            name: albumName,
        };
        try {
            await editAlbum(data);
            this.props.onClose();
        } catch {
            alert('Не удалось отредактировать альбом');
        }
    };

render() {
    const { show, onClose, editMode } = this.props;
    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Formik
                    onSubmit={editMode ? this.handleEditAlbum : this.handleAddNewAlbum}
                    initialValues={{
                        albumName: ''
                    }}
                    validate={validateAlbumForm}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          values,
                          touched,
                          isValid,
                          errors,
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                {editMode ?
                                    <Modal.Title>Редактирование</Modal.Title>:
                                    <Modal.Title>Создание альбома</Modal.Title>
                                }
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group as={Row} controlId="formAlbumTitle">
                                    <Form.Label column sm="2">Название</Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text"
                                                      name='albumName'
                                                      value={values.albumName}
                                                      isInvalid={errors.albumName}
                                                      onChange={handleChange}/>
                                        <Form.Control.Feedback type="invalid">
                                            Это поле обязательное
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                    <Button type="submit" variant="primary">Ок</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}
}


function mapStateToProps (state) {
    return {
        keyUser: state.saveUserInfoReducer.key,
    };
}


const mapDispatchToProps = {
    createAlbum,
    editAlbum,
};


export default connect(mapStateToProps, mapDispatchToProps)(AddAlbumModal);



