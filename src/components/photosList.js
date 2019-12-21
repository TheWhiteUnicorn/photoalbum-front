import React from 'react';


import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
    Card, CardColumns,
    Container,
} from "react-bootstrap";

import {Link} from "react-router-dom";


const options = [
    'Удалить',
    'Редактировать'
];

const ITEM_HEIGHT = 48;



class PhotosList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
        }
    }
    list = [1, 2, 3, 4, 5];

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
            open: event.currentTarget,
        });
    };

     handleClose = () => {
         this.setState({
             anchorEl: null,
             open: null,
         });
    };



    render() {
        const {onCardClick} = this.props;
        const {anchorEl, open} = this.state;
        return (<div>
            <Container>
                <CardColumns>
                    {this.list.map((id) => (
                            <Card onClick={onCardClick}>
                                <Link to={'/photos/1488'}>
                                    <Card.Img
                                        variant="top"
                                        src="https://static.boredpanda.com/blog/wp-content/uploads/2019/02/sony-world-photography-awards-2019-14-5c61944526bfd__880.jpg"
                                    />
                                </Link>
                                <Card.Body className='card_name'>
                                    <Link to={'/photos/1488'}>
                                        <Card.Title>Photo name</Card.Title>
                                    </Link>
                                    <div>
                                        <IconButton
                                            aria-label="more"
                                            aria-controls="long-menu"
                                            aria-haspopup="true"
                                            onClick={this.handleClick}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
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
                                                <MenuItem key={option} selected={option === 'Редактировать'} onClick={this.handleClose}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                </Card.Body>
                            </Card>
                    ))
                    }
                </CardColumns>
            </Container>
        </div>)
    }
}

export default PhotosList;