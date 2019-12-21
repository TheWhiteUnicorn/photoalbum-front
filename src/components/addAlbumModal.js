import React from 'react'
import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import axios from "axios";

class AddAlbumModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albumName: '',
            nameError: false,
        }
    }


    handleChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleAddNewAlbum = () => {
        let albumName = this.state.albumName.replace(/^\s+|\s+$/g, '');
        console.log(albumName,4564654);
        if(albumName.length) {
            this.setState({
                nameError: false,
            });
            // axios.post('/rest-auth/registration/', {
            //     username: userName,
            //     password1: pass1,
            //     password2: pass2,
            // }).then((response) => console.log(response));
            this.props.onClose();
            this.setState( { albumName: ''});
        } else {
            this.setState({
                nameError: true,
            })
        }
    };

render() {
    const { show, onClose } = this.props;
    const { albumName } = this.state;
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
                            <Form.Control type="text" name='albumName' value={albumName} onChange={this.handleChangeInput}/>
                        </Col>
                        {!albumName && <Form.Text className='error-message'>заполните поле название!</Form.Text>}

                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleAddNewAlbum}>
                        Ок
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

}

export default AddAlbumModal