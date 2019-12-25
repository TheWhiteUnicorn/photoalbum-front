import React from 'react'
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import Comment from "../components/comment";
import {getPhotosAll, setCurrentPhoto} from "../store/action/actions";
import {connect} from "react-redux";


class Photo extends React.Component {
    state = {
        newComment: '',
    };

    componentDidMount() {
        const {getPhotosAll, setCurrentPhoto, match: {params: {id}}} = this.props;
        getPhotosAll();
        setCurrentPhoto(id);
    }

    handleChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const {currentPhoto} = this.props;
        const {newComment} = this.state;

        return (
            <div>
                {currentPhoto && <Container>
                    <h1 className='mb-5 mt-4'>{currentPhoto.name}</h1>
                    <Image
                        className='photo-main mb-5'
                        src={currentPhoto.image ? currentPhoto.image : 'https://semantic-ui.com/images/wireframe/image.png'}
                    />
                    <h3>Комментарии</h3>
                    {currentPhoto.comments && currentPhoto.comments.map((comment)=>(
                        <Comment data={comment}/>
                    ))
                    }
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="3">
                            Ваш комментарий
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" name='newComment' value={newComment} onChange={this.handleChangeInput}/>
                        </Col>
                        <Col sm="3">
                            <Button variant="primary" type="submit">
                                Отправить
                            </Button>
                        </Col>
                    </Form.Group>
                </Container> }
            </div>
        )
    }
}

function mapStateToProps (state) {
    let currentPhoto = null;
    if (state.photos.photos && state.photos.currentPhoto)
        currentPhoto = state.photos.photos.find((photo) => photo.id === state.photos.currentPhoto);
    console.log(currentPhoto);
    return {
        userInfo: state.getUserInfoReducer,
        currentPhoto,
    };
}

const mapDispatchToProps = {
    setCurrentPhoto,
    getPhotosAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);