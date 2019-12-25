import React from 'react';
import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import {createPhoto} from "../store/action/actions";
import {connect} from "react-redux";

class AddPhotoModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            image: null,
        }
    }

    handleFileChange = e => {
        const image = e.target.files[0];
        this.setState(() => {
            return {
                image
            }
        }, () => console.log(image, 3333333333, this.props.currentAlbum));
    };

    handleChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleFormSubmit = async (e) => {
        const { currentAlbum } = this.props;
        e.preventDefault();
        const {name, image} = this.state;
        let photoName = name.replace(/^\s+|\s+$/g, '');
        if(photoName.length && image !== null) {
            try {
                await this.props.createPhoto({name, image, currentAlbum});
                this.props.onClose();
                this.setState( { name: '', image: null });
            } catch {
                alert('Не удалось создать альбом');
            }
        } else {
            alert('Введите незвание и выберите файл')
        }

    };

    render() {
        const { show, onClose } = this.props;
        const { name, image } = this.state;
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
                                <Form.Control type="text" name="name" value={name} onChange={this.handleChangeInput}/>
                            </Col>
                            <Form.Label column sm="2">
                                Файл
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="file" onChange={this.handleFileChange} />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleFormSubmit}>
                            Ок
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}



function mapStateToProps (state) {
    return {
        keyUser: state.saveUserInfoReducer.key,
        currentAlbum: state.albums.currentAlbum,
    };
}


const mapDispatchToProps = {
    createPhoto,
};


export default connect(mapStateToProps, mapDispatchToProps)(AddPhotoModal);
