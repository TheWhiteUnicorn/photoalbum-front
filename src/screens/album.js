import React from 'react'
import {Button, Col, Container, Image, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";

import PhotosList from "../components/photosList";
import AddPhotoModal from "../components/addPhotoModal";
import {getAlbumPhotos, getAlbums, getPhotosAll, getUser, setCurrentAlbum} from "../store/action/actions";
import {connect} from "react-redux";


class Album extends React.Component {
    state = {
        showAddPhotoModal: false
    };

    componentDidMount() {
        const {setCurrentAlbum, getAlbums, getAlbumPhotos, match: {params: id}} = this.props;
        setCurrentAlbum(id);
        getAlbums();
        getAlbumPhotos();
    }

    onAddPhoto = () => this.setState({showAddPhotoModal: true});
    onCloseAddPhotoModal = () => this.setState({showAddPhotoModal: false});
    
    render() {
        const {id} = this.props.match.params;

        return (<>
            <div>
                <Container>
                    <Row className={'top-toolbar'}>
                        <Col xs={1}>
                            <Image
                                className='user-avatar'
                                src='https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg'
                                roundedCircle/>
                        </Col>
                        <Col>
                            <Button onClick={this.onAddPhoto}>Добавить фото</Button>
                        </Col>
                        <Col xs='auto'>Название альбома {id}</Col>
                    </Row>
                    <Row>
                        <PhotosList/>
                    </Row>
                </Container>
            </div>
            <AddPhotoModal show={this.state.showAddPhotoModal} onClose={this.onCloseAddPhotoModal}/>
        </>)
    }
}

function mapStateToProps (state) {
    return {
        userInfo: state.getUserInfoReducer,
        albums: state.albums,
        photos: state.photos,
    };
}

const mapDispatchToProps = {
    setCurrentAlbum,
    getAlbums,
    getAlbumPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Album);