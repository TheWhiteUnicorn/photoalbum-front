import React from 'react'
import {
    Card, CardColumns,
    Container,
} from "react-bootstrap";
import {Link} from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { deleteAlbum } from "../store/action/actions";
import {connect} from "react-redux";
import AddAlbumModal from "./addAlbumModal";


const options = [
    'Удалить',
    'Редактировать'
];

const ITEM_HEIGHT = 48;

class AlbumsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            openForAlbumId: null,
            showAddAlbumModal: false,
        }
    }

    handleClick = async (event, index) => {
        console.log(index, this.state.openForAlbumId, 2222222222);
        this.setState({
            anchorEl: event.currentTarget,
            open: event.currentTarget,
        });

        switch (index) {
            case 0:
                const isAdmin = window.confirm("Удалить?");
                if(isAdmin) {
                   await this.props.deleteAlbum(this.state.openForAlbumId);
                   this.handleClose();
                } else {
                    return;
                }
                break;
            case 1: this.onAddAlbum();
                break;
        }

    };

    handleOpenMenu = (event, albumId) => {
        this.setState({
            openForAlbumId: albumId,
            anchorEl: event.currentTarget,
            open: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
            open: false,
        });
    };

    onCloseAddAlbumModal = () => this.setState({showAddAlbumModal: false});
    onAddAlbum = () => this.setState({showAddAlbumModal: true});


    render() {
        const {onCardClick, albums} = this.props;
        const {anchorEl, open} = this.state;

        return (<div>
            <Container>
                <CardColumns>
                    {albums && albums.map((album)=>(
                            <Card key={album.id} onClick={onCardClick}>
                                <Link to={`/albums/${album.id}`}>
                                    <Card.Img
                                        variant="top"
                                        src={album.cover ? album.cover : 'https://semantic-ui.com/images/wireframe/image.png'}
                                    />
                                </Link>
                                <Card.Body className='card_name'>
                                    <Link to={`/albums/${album.id}`}>
                                        <Card.Title>{album.name}</Card.Title>
                                    </Link>
                                    {album.owned_by_current &&
                                    <div>
                                        <IconButton
                                            aria-label="more"
                                            aria-controls={`long-menu${album.id}`}
                                            aria-haspopup="true"
                                            onClick={event => this.handleOpenMenu(event, album.id)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id={`long-menu${album.id}`}
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={open}
                                            onClose={this.handleClose}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                    width: 200,
                                                },
                                            }}
                                        >
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    onClick={event => this.handleClick(event, index)}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>}
                                </Card.Body>
                            </Card>
                    ))
                    }
                </CardColumns>
            </Container>
            <AddAlbumModal show={this.state.showAddAlbumModal} editMode={true} id={this.state.openForAlbumId} onClose={this.onCloseAddAlbumModal}/>
        </div>)
    }
}


function mapStateToProps (state) {
    return {
        keyUser: state.saveUserInfoReducer.key,
    };
}


const mapDispatchToProps = {
    deleteAlbum,
};


export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList);
