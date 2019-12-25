import React from 'react'
import {Button, Col, Container, Image, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";


class Comment extends React.Component {
    render() {
        const {data} = this.props;
        console.log(data);
        return (<div>
            <Container className='comment-container rounded'>
                <Row className='justify-content-start align-items-center comment-head'>
                    <Col xs={1} className={'mh-1'}>
                        <Image
                        className='user-avatar-comment'
                        src='https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg'
                        roundedCircle/>
                    </Col>
                    <Col>{data.creator.username}</Col>
                </Row>
                <Row className='comment-body'>
                    <Col>
                        {data.text}
                    </Col>
                </Row>
            </Container>
        </div>)
    }
}

export default Comment;