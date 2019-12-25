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
        const {setCurrentAlbum, getAlbums, getAlbumPhotos, match: {params: {id}}} = this.props;
        setCurrentAlbum(id);
        getAlbums();
        getAlbumPhotos(id);
    }

    onAddPhoto = () => this.setState({showAddPhotoModal: true});
    onCloseAddPhotoModal = () => this.setState({showAddPhotoModal: false});
    
    render() {
        const {currentAlbum, photos} = this.props;

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
                        <Col xs='auto'>{currentAlbum && currentAlbum.name}</Col>
                    </Row>
                    <Row>
                        <PhotosList photos={photos}/>
                    </Row>
                </Container>
            </div>
            <AddPhotoModal show={this.state.showAddPhotoModal} onClose={this.onCloseAddPhotoModal}/>
        </>)
    }
}

function mapStateToProps (state) {
    let currentAlbum = null;
    if (state.albums.albums && state.albums.currentAlbum)
        currentAlbum = state.albums.albums.find((album) => album.id === state.albums.currentAlbum);
    return {
        userInfo: state.getUserInfoReducer,
        currentAlbum: currentAlbum,
        photos: state.photos.photos,
    };
}

const mapDispatchToProps = {
    setCurrentAlbum,
    getAlbums,
    getAlbumPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Album);