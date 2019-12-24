import React from 'react'
import {Button, Col, Container, Image, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";

import AlbumsList from "../components/albumsList";
import PhotosList from "../components/photosList";
import AddAlbumModal from "../components/addAlbumModal";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import Button  from '@material-ui/core/Button';


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
            menu: null,
        }
    }

    componentDidMount() {
        this.getUserData();
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

    onChangeDisplayMode = value => this.setState({displayMode: value});

    onAddAlbum = () => this.setState({showAddAlbumModal: true});
    onCloseAddAlbumModal = () => this.setState({showAddAlbumModal: false});

    onRegistration = () => {
        this.setState({
            showRegistrationModal: true,
            menu: null,
        });
    };
    onCloseRegistrationModal = () => this.setState({showRegistrationModal: false});


    render() {
        const {displayMode, menu} = this.state;

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
                                    <MenuItem onClick={this.onRegistration}>Sign Up</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Log in</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
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