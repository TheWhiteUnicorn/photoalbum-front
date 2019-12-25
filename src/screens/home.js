import React from 'react'
import {Button, Col, Container, Image, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";

import AlbumsList from "../components/albumsList";
import PhotosList from "../components/photosList";
import AddAlbumModal from "../components/addAlbumModal";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import RegisterModal from "../components/regUserModal";
import LoginModal from "../components/loginUserModal";
import { getUser, deleteUserData, getAlbums, getPhotosAll} from "../store/action/actions";

import {connect} from "react-redux";


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayMode: 'albums',
            showAddAlbumModal: false,
            showRegistrationModal: false,
            showLoginModal: false,
            menu: null,
        }
    }

    componentDidMount() {
        this.getUserData();
        this.props.getAlbums()
    }

    getUserData = () => {
      this.props.getUser();
    };

    handleClickMenu = event => {
        this.setState({
            menu: event.currentTarget
        });
    };

    handleClose = () => {
        this.setState({
            menu: null
        });
    };

    onChangeDisplayMode = value => {
        const {getPhotosAll} = this.props;
        getPhotosAll();
        this.setState({displayMode: value});
    };

    onAddAlbum = () => this.setState({showAddAlbumModal: true});
    onCloseAddAlbumModal = () => this.setState({showAddAlbumModal: false});

    onRegistration = () => {
        this.setState({
            showRegistrationModal: true,
            menu: null,
        });
    };

    onLogin = () => {
        this.setState({
            showLoginModal: true,
            menu: null,
        });
    };

    onLogoutHandle = async () => {
      const { keyUser, deleteUserData } = this.props;
      try {
          await deleteUserData(keyUser);
          this.handleClose();
      } catch (e) {
          return;
      }
    };
    onCloseRegistrationModal = () => this.setState({showRegistrationModal: false});
    onCloseLoginModal = () => this.setState({showLoginModal: false});

    render() {
        const {displayMode, menu} = this.state;
        const {albums, photos, userInfo} = this.props;

        return (
            <div>
                <Container>
                    <Row className={'top-toolbar'}>
                        <Col xs={1}>
                            <div>
                                <div aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClickMenu}>
                                    <Image
                                        className='user-avatar'
                                        src='https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg'
                                        roundedCircle
                                    />
                                </div>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={menu}
                                    keepMounted
                                    open={Boolean(menu)}
                                    onClose={this.handleClose}
                                >
                                    {!userInfo && <MenuItem onClick={this.onRegistration}>Sign Up</MenuItem>}
                                    {!userInfo && <MenuItem onClick={this.onLogin}>Log in</MenuItem>}
                                    {userInfo && <MenuItem onClick={this.onLogoutHandle}>Logout</MenuItem>}
                                </Menu>
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
                            <AlbumsList albums={albums}/>
                            : <PhotosList photos={photos}/>
                        }
                    </Row>
                </Container>
                <AddAlbumModal show={this.state.showAddAlbumModal} onClose={this.onCloseAddAlbumModal}/>
                <RegisterModal show={this.state.showRegistrationModal} onClose={this.onCloseRegistrationModal}/>
                <LoginModal show={this.state.showLoginModal} onClose={this.onCloseLoginModal}/>

            </div>
        )
    }
}


function mapStateToProps (state) {
    return {
        userInfo: state.getUserInfoReducer.userInfo,
        keyUser: state.saveUserInfoReducer.key,
        albums: state.albums.albums,
        photos: state.photos.photos,
    };
}

const mapDispatchToProps = {
    getUser,
    getAlbums,
    getPhotosAll,
    deleteUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);