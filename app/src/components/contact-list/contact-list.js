import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

import ContactService from '../../service/contacts.service';
import Contact from '../contact/contact';
import './contact-list.scss';

class ContactList extends Component {
  constructor(args) {
    super(args);
    this.contactService = new ContactService();
  }

  state = {
    contacts: null
  }

  listContacts() {
    this.contactService.list({ sort: 'createdAt DESC' } ).then((contacts) => {
      this.setState({
        ...this.state,
        contacts
      });
    });
  }
  componentDidMount() {
    this.listContacts();
    document.addEventListener('contact:list', () => {
      this.listContacts();
    });
  }
  componentWillUnmount(){
    document.removeEventListener('contact:list');
  }

  render() {
    const { contacts } = this.state;
    return (
      <section className='ContactList' id='contactList'>
        { contacts && ( 
            (contacts.length > 0) && (
              <List>
                {contacts.map((contact, id) => (
                  <ListItem>
                    <Link to={`/c/${contact.id}`}>
                      <Contact info={contact}></Contact>
                    </Link>
                  </ListItem>
                ))}
              </List>
            ) || (
              <h3> Please Press + to add a contact </h3>
            )
          ) || (
            <h3>loading ... </h3>
          )
        }
      </section>
    )
  }
}

export default ContactList;
