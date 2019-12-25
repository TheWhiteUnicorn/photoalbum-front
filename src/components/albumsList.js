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
        }
    }

    handleClick = event => {
        console.log(event);
        this.setState({
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
                                            onClick={this.handleClick}
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
                                            {options.map(option => (
                                                <MenuItem
                                                    key={option}
                                                    // selected={option === 'Редактировать'}
                                                    onClick={this.handleClick}>
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
        </div>)
    }
}

export default AlbumsList