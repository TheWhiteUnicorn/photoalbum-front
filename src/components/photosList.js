import React from 'react'
import {
    Card, CardColumns,
    Container,
} from "react-bootstrap";
import {Link} from "react-router-dom";

class PhotosList extends React.Component {
    list = [1, 2, 3, 4, 5];

    render() {
        const {onCardClick} = this.props;

        return (<div>
            <Container>
                <CardColumns>
                    {this.list.map(()=>(
                        <Link to={'/photos/1488'}>
                            <Card onClick={onCardClick}>
                                <Card.Img
                                    variant="top"
                                    src="https://static.boredpanda.com/blog/wp-content/uploads/2019/02/sony-world-photography-awards-2019-14-5c61944526bfd__880.jpg"/>
                                <Card.Body>
                                    <Card.Title>Photo name</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    ))
                    }
                </CardColumns>
            </Container>
        </div>)
    }
}

export default PhotosList;