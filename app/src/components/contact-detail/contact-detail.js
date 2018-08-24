import React, { Component } from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';

import { Phone, Email } from '@material-ui/icons';

import ContactService from '../../service/contacts.service';
import './contact-detail.scss';

class ContactDetail extends Component {
  constructor(props){
    super(props);
    this.contactService = new ContactService();
  }

  state = {
    contact: {}
  }

  getDetailUser(){
    this.contactService
    .read(this.props.id)
    .then((contact) => {
      this.setState({
        ...this.state,
        contact
      })
    });
  }
  
  componentDidMount(){
    this.getDetailUser();
  }

  componentDidUpdate(){
    if(this.props.id != this.state.contact.id){
      this.getDetailUser();
    }
  }

  render() {
    const { contact } = this.state;
    
    return (
      <Card className='ContactCardDetail'>
        <CardMedia
          className="ContactCardDetail__media"
          image={ contact.profileImage || 'https://www.oxygenna.com/wp-content/uploads/2015/11/18.jpg' }
          title={ contact.name }
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {this.props.id} { contact.name || 'loading...' }
          </Typography>
        </CardContent>
      <CardActions className='ContactCardDetail__actions'>
        <a href={`tel:${contact.phone}`}>
          <Button size="small" color="primary">
            <Phone></Phone>
            { contact.phone || 'loading...' }
          </Button>
        </a>
        <a href={`mailTo:${contact.email}`}>
          <Button size="small" color="primary">
            <Email></Email>
            { contact.email || 'loading...' }
          </Button>
        </a>
      </CardActions>
      </Card>
    )
  }
}

export default ContactDetail;
