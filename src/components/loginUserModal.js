import React from 'react'
import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import {connect} from "react-redux";
import {Formik} from "formik";

import { postLogin, getUser } from "../store/action/actions";
import {validateLoginForm} from "../utils/validators/loginValidator";


class LoginModal extends React.Component {

    handleSubmitBtn = async (formData) => {
        let pass1 = formData.pass1;
        let userName = formData.userName;

        if (pass1.length && userName.length) {
            const data = {
                username: userName,
                pass1: pass1,
            };
            try {
                await this.props.postLogin(data);
                this.props.onClose();

                if(this.props.keyUser) {
                    this.props.getUser(this.props.keyUser);
                }
            } catch(error) {
                console.log('Response was failed', error);
                alert('Введены неправильные данные!');
            }

        } else {
            alert('Заполните, пожалуйста все поля');
        }
    };

    render() {
        const { show, onClose } = this.props;

        return (
            <>
                <Modal show={show} onHide={onClose}>
                    <Formik
                        onSubmit={this.handleSubmitBtn}
                        initialValues={{
                            userName: '',
                            pass1: '',
                        }}
                        validate={validateLoginForm}
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
                                    <Modal.Title>Вход</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group as={Row} controlId="formAlbumTitle">
                                        <Form.Label column sm="2">
                                            Логин
                                        </Form.Label>
                                        <Col sm="10" className='padding-reg-input'>
                                            <Form.Control type="text" name='userName'
                                                          value={values.userName}
                                                          isInvalid={errors.userName}
                                                          onChange={handleChange}/>
                                            <Form.Control.Feedback type="invalid">
                                                Это поле обязательное
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Form.Label column sm="2" className="reg-modal-label">
                                            Пароль
                                        </Form.Label>
                                        <Col sm="10" className='padding-reg-input' >
                                            <Form.Control type="password" name='pass1'
                                                          value={values.pass1}
                                                          isInvalid={errors.pass1}
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
    postLogin,
    getUser
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);