import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import {
  Snackbar,
  SnackbarContent,
  IconButton,
  Button,
  Typography,
  AppBar,
  Toolbar
} from '@material-ui/core';

import {
  Close as CloseIcon,
  Add as AddIcon
} from '@material-ui/icons';

import ContactList from './components/contact-list/contact-list';
import ContactDetail from './components/contact-detail/contact-detail';
import ContactNew from './components/contact-new/contact-new';

import './App.scss';

class App extends Component {
  state = {
    open: false,
    error: false,
  }
  handleClose() {
    this.setState({
      ...this.state,
      error: false,
      open: false
    });
  }

  openAlert(e) {
    this.setState({
      ...this.state,
      message: e.detail.message,
      error: e.detail.isError,
      open: true
    });
  }

  componentDidMount() {
    document.addEventListener('alert:open', this.openAlert.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('alert:open');
  }

  scrollTop(){
    window.scrollTo({top: 0});
  }

  render() {
    return (
      <Router>
        <div className='ContactsApp'>
          <header className='ContactsApp__header'>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="title" color="inherit" className="ContactsApp__header__text">
                  Contact App
              </Typography>
              </Toolbar>
            </AppBar>
          </header>
          <main className='ContactsApp__main'>
            <section className='ContactsApp__main__list'>
              <ContactList></ContactList>
            </section>
            <section className='ContactsApp__main__view'>
              <Route path='/c/:id' render={({ match }) => (
                <ContactDetail id={match.params.id}></ContactDetail>
              )} />
              <Route exact path='/new' component={ContactNew} />
              <Redirect to="/new" />
            </section>
          </main>
          <footer>
            <Link to='/new'>
              <Button variant="fab" color="secondary" aria-label="Add" onClick={this.scrollTop.bind(this)} >
                <AddIcon />
              </Button>
            </Link>
          </footer>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={5000}
            onClose={this.handleClose.bind(this)}
          >
            <SnackbarContent
              className={ "alertDialog " + ((this.state.error && 'error') || '') }
              aria-describedby="client-snackbar"
              message={
                <span id="client-snackbar" className="alertDialog__message">
                  {this.state.message}
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className="alertDialog__close"
                  onClick={this.handleClose.bind(this)}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </Snackbar>
        </div>
      </Router>
    );
  }
}

export default App;
