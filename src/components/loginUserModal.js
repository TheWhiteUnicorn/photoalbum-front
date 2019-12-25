import React from 'react'
import {Button, Modal, Form, Row, Col} from "react-bootstrap";

import { postLogin, getUser } from "../store/action/actions";

import {connect} from "react-redux";


class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pass1: '',
            userName: '',
            errorEmail: true,
        }
    }

    handleSubmitBtn = async () => {
        let pass1 = this.state.pass1.replace(/^\s+|\s+$/g, '');
        let userName = this.state.userName.replace(/^\s+|\s+$/g, '');

        if (pass1.length && userName.length) {
            const data = {
                username: userName,
                pass1: pass1,
            };
            try {
                await this.props.postLogin(data);
                this.setState( { userName:'', pass1:'' });
                this.props.onClose();

                console.log(this.props.keyUser);
               // const uerKey = localStorage.getItem('key');
                if(this.props.keyUser) {
                    this.props.getUser(this.props.keyUser);
                }
            } catch(error) {
                console.log('Response was failed', error);
                this.setState( { userName:'', pass1:'' });
            }

        } else {
            alert('Заполните, пожалуйста все поля');
        }
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { show, onClose } = this.props;
        const { pass1, userName } = this.state;

        return (
            <>
                <Modal show={show} onHide={onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Вход</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} controlId="formAlbumTitle">
                            <Form.Label column sm="2">
                                Логин
                            </Form.Label>
                            <Col sm="10" className='padding-reg-input'>
                                <Form.Control type="text" name='userName' value={userName} onChange={this.handleInputChange}/>
                            </Col>
                            <Form.Label column sm="2" className="reg-modal-label">
                                Пароль
                            </Form.Label>
                            <Col sm="10" className='padding-reg-input' >
                                <Form.Control type="password" name='pass1' value={pass1} onChange={this.handleInputChange}/>
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSubmitBtn}>
                            Войти
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
    };
}


const mapDispatchToProps = {
    postLogin,
    getUser
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);