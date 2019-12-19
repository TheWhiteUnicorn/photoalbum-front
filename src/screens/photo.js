import React from 'react'
import {Button, Card, Col, Container, Form, Image, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import Comment from "../components/comment";


class Photo extends React.Component {
    list = [1, 2, 3, 4, 5];

    render() {
        const {id} = this.props.match.params;

        return (
            <div>
                <Container>
                    <h1 className='mb-5 mt-4'>{id}</h1>
                    <Image
                        className='photo-main mb-5'
                        src='https://static.boredpanda.com/blog/wp-content/uploads/2019/02/sony-world-photography-awards-2019-14-5c61944526bfd__880.jpg'
                    />
                    <h3>Комментарии</h3>
                    {this.list.map(()=>(
                        <Comment/>
                    ))
                    }
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="3">
                            Ваш комментарий
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text"/>
                        </Col>
                        <Col sm="3">
                            <Button variant="primary" type="submit">
                                Отправить
                            </Button>
                        </Col>
                    </Form.Group>
                </Container>
            </div>
        )
    }
}

export default Photo;