import React from 'react'
import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import axios from "axios";
import {postRegister} from "../store/action/actions";
import {connect} from "react-redux";


class RegisterModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            pass1: '',
            pass2: '',
            userName: '',
            errorEmail: true,
            errorPass: false,
        }
    }

    handleSubmitBtn = () => {
        let email = this.state.email.replace(/^\s+|\s+$/g, '');
        let pass1 = this.state.pass1.replace(/^\s+|\s+$/g, '');
        let pass2 = this.state.pass2.replace(/^\s+|\s+$/g, '');
        let userName = this.state.userName.replace(/^\s+|\s+$/g, '');
        if (pass1.length && pass2.length && userName.length) {
            if(this.state.pass1 !== this.state.pass2) {
                this.setState({
                    errorPass: true,
                });
            } else {
                const data = {
                    username: userName,
                    pass1: pass1,
                    pass2: pass2,
                    email: email,
                };
                this.props.postRegister(data);
                this.setState( { userName:'', pass1:'', email: '', pass2: '' });
                this.props.onClose();
                this.props.getUserData();
            }

        } else {
            alert('Заполните, пожалуйста все поля');
        }
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

        if (this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            this.setState({
                errorEmail: true,
            })
        } else {
            this.setState({
                errorEmail: false,
            })
        }
    };

    render() {
        const { show, onClose } = this.props;
        const { pass1, pass2, email, userName } = this.state;

        return (
            <>
                <Modal show={show} onHide={onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Регистрация</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} controlId="formAlbumTitle">
                            <Form.Label column sm="2">
                                Имя
                            </Form.Label>
                            <Col sm="10" className='padding-reg-input'>
                                <Form.Control type="text" name='userName' value={userName} onChange={this.handleInputChange}/>
                            </Col>
                            {this.state.errorPass && <Form.Text className="error-message">пароли не совпадают</Form.Text>}
                            <Form.Label column sm="2" className="reg-modal-label">
                                Пароль 1
                            </Form.Label>
                            <Col sm="10" className='padding-reg-input' >
                                <Form.Control type="password" name='pass1' value={pass1} onChange={this.handleInputChange}/>
                            </Col>
                            {this.state.errorPass && <Form.Text className="error-message">пароли не совпадают</Form.Text>}
                            <Form.Label column sm="2" className="reg-modal-label">
                                Пароль 2
                            </Form.Label>
                            <Col sm="10" className='padding-reg-input'>
                                <Form.Control type="password" name = 'pass2' value={pass2} onChange={this.handleInputChange} />
                            </Col>
                            <Form.Label column sm="2" className="reg-modal-label">
                                email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name = 'email' value={email} onChange={this.handleInputChange}/>
                            </Col>
                            {!this.state.errorEmail && <Form.Text className='error-message'>напишите корректный формат имейла</Form.Text>}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSubmitBtn}>
                            Зарегистрироваться
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

}



const mapDispatchToProps = {
    postRegister,
};


export default connect(null, mapDispatchToProps)(RegisterModal);