import React, { Component } from 'react';

import {
  FormGroup,
  FormControl,
  InputAdornment,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Input,
  InputLabel,
} from '@material-ui/core';

import {
  Save,
  AccountCircle,
  Camera,
  Phone,
} from '@material-ui/icons';

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Loading from 'react-loading-bar'
import ContactService from '../../service/contacts.service';
import './contact-new.scss';

function PhoneInput(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

PhoneInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


class ContactNew extends Component {
  state = {
    phone: '',
    email: '',
    open: false,
  };
  constructor(args) {
    super(args);
    this.contactService = new ContactService();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  openFile = () => {
    document.querySelector('#file-browser').click();
  };

  showLoadingBar(){
    this.setState({
      ...this.state,
      show: true
    });
  }

  hideLoadingBar(){
    this.setState({
      ...this.state,
      show: false
    });
  }

  chooseFile = (files) => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        profileImage: files[0],
        imagePreview: reader.result
      })
    }
  }

  newContact() {
    this.showLoadingBar();
    this.contactService.create({
      ...this.state,
      profileImage: null,
      imagePreview: undefined,
    }).then((contact) => {
      this.showLoadingBar();
      if(this.state.profileImage){
        return this.contactService.uploadProfileImage(contact.id, this.state.profileImage);
      }else{
        return Promise.resolve(contact)
      }
    }).then((contact) => {
      this.hideLoadingBar();
      document.dispatchEvent(new CustomEvent('contact:list'));
      document.dispatchEvent(new CustomEvent('alert:open', { detail: { isError: false, message: 'Contact Created' } }));
      
      this.props.history.push(`/c/${contact.id}`);
    }).catch(err => {
      this.hideLoadingBar();
      document.dispatchEvent(new CustomEvent('alert:open', { detail: { isError: true, message: 'Please Verify Your Data' } }));
    });
  }

  render() {
    const { phone, email, name, show } = this.state;

    return (
      <Card className='ContactCardNew'>
        <CardMedia
          className="ContactCardNew__media"
          image={this.state.imagePreview || 'https://www.oxygenna.com/wp-content/uploads/2015/11/18.jpg'}
          title="Live from space album cover"
        />
        <CardContent className='ContactCardNew__content'>
          <Loading 
            show={show}
            color="red"
          />
          <form>
            <FormGroup>
              <Button onClick={this.openFile} variant="fab" color="primary" aria-label="Add" className='ContactCardNew__camera-btn'>
                <Camera />
              </Button>
              <input type='file' id='file-browser' onChange={(e) => this.chooseFile(e.target.files)} ></input>
            </FormGroup>
            <FormGroup className='ContactCardNew__form-control'>
              <FormControl>
                <InputLabel htmlFor="name-input">Name</InputLabel>
                <Input
                  value={name}
                  name='name'
                  onChange={this.handleChange('name')}
                  id="name-input"
                />
              </FormControl>
            </FormGroup>
            <FormGroup className='ContactCardNew__form-control'>
              <FormControl >
                <InputLabel htmlFor="phone-input">Phone</InputLabel>
                <Input
                  value={phone}
                  name='phone'
                  id="phone-input"
                  onChange={this.handleChange('phone')}
                  startAdornment={
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  }
                  inputComponent={PhoneInput}
                />
              </FormControl>
            </FormGroup>
            <FormGroup className='ContactCardNew__form-control'>
              <FormControl >
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <Input
                  required={true}
                  type="email"
                  value={email}
                  onChange={this.handleChange('email')}
                  id="email-input"
                  name='email'
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </FormGroup>
          </form>
        </CardContent>
        <CardActions className='ContactCardNew__actions'>
          <Button size="small" color="primary" onClick={this.newContact.bind(this)}>
            <Save></Save>
            Save
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default ContactNew;
