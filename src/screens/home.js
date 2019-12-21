import React from 'react'
import {Button, Col, Container, Image, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";

import AlbumsList from "../components/albumsList";
import PhotosList from "../components/photosList";
import AddAlbumModal from "../components/addAlbumModal";

import axios from 'axios';
import RegisterModal from "../components/regUserModal";
import {getUser} from "../store/action/actions";

import {connect} from "react-redux";


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayMode: 'albums',
            showAddAlbumModal: false,
            showRegistrationModal: false,
        }
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData = () => {
      this.props.getUser();
    };

    onChangeDisplayMode = value => this.setState({displayMode: value});

    onAddAlbum = () => this.setState({showAddAlbumModal: true});
    onCloseAddAlbumModal = () => this.setState({showAddAlbumModal: false});

    onRegistration = () => this.setState({showRegistrationModal: true});
    onCloseRegistrationModal = () => this.setState({showRegistrationModal: false});


    render() {
        const {displayMode} = this.state;

        return (
            <div>
                <Container>
                    <Row className={'top-toolbar'}>
                        <Col xs={1}>
                            <div onClick={this.onRegistration}>
                                <Image
                                    className='user-avatar'
                                    src='https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg'
                                    roundedCircle
                                />
                            </div>
                        </Col>
                        <Col>
                            {displayMode === 'albums' && <Button onClick={this.onAddAlbum}>Добавить альбом</Button>}
                        </Col>
                        <Col xs='auto'>Режим отображения</Col>
                        <Col xs='auto'>
                            <ToggleButtonGroup type="radio" name="options" value={displayMode} onChange={this.onChangeDisplayMode}>
                                <ToggleButton type="radio" name="albums" value="albums">
                                    Альбомы
                                </ToggleButton>
                                <ToggleButton type="radio" name="all-photos" value="all-photos">
                                    Все фото
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </Row>
                    <Row>
                        {displayMode === 'albums'?
                            <AlbumsList onCardClick={this.onAlbumClick}/>
                            : <PhotosList/>
                        }
                    </Row>
                </Container>
                <AddAlbumModal show={this.state.showAddAlbumModal} onClose={this.onCloseAddAlbumModal}/>
                <RegisterModal show={this.state.showRegistrationModal} getUserData={this.getUserData} onClose={this.onCloseRegistrationModal}/>
            </div>
        )
    }
}



function mapStateToProps (state) {
    return {
        userInfo: state.getUserInfoReducer,
    };
}

const mapDispatchToProps = {
    getUser,
};



export default connect(mapStateToProps, mapDispatchToProps)(Home);