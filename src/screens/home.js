import React from 'react'
import {Button, Col, Container, Image, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";

import AlbumsList from "../components/albumsList";
import PhotosList from "../components/photosList";
import AddAlbumModal from "../components/addAlbumModal";


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayMode: 'albums',
            showAddAlbumModal: false,
        }
    }

    onChangeDisplayMode = value => this.setState({displayMode: value});

    onAddAlbum = () => this.setState({showAddAlbumModal: true});
    onCloseAddAlbumModal = () => this.setState({showAddAlbumModal: false});


    render() {
        const {displayMode} = this.state;

        return (
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
            </div>
        )
    }
}

export default Home;