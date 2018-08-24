import React, { Component } from 'react';

import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';

import './contact.scss';

class Contact extends Component {

    render() {
        const { info } = this.props;

        return (
            <Card className='ContactCard'>
                <div className="ContactCard__details">
                    <CardContent className="ContactCard__details__content">
                        <Typography variant="headline">{info.name}</Typography>
                    </CardContent>
                    <div className="ContactCard__details__controls">
                        <IconButton aria-label="Visibility">
                            <Visibility className="ContactCard__details__controls__play" />
                        </IconButton>
                    </div>
                </div>
                <CardMedia
                    className="ContactCard__media"
                    image={info.profileImage || "https://www.oxygenna.com/wp-content/uploads/2015/11/18.jpg"}
                    title="Live from space album cover"
                />
            </Card>
        )
    }
}

export default Contact;
