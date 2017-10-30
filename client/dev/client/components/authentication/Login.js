import React, {Component} from 'react';
import {connect} from 'react-redux';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import Registration from '../registration/Registration';

import { attemptLogin } from '../../actions/authentication';
import { hideSnackbar, showRegistration, hideRegistration } from '../../actions/index';

import ChangeLogFeed from '../feeds/ChangeLogFeed';

const panelPadding = {
  padding: '2rem',
}

const formStyle = {
  display: 'flex',
  flexWrap: 'wrap'
}

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }
    this.login = () => {
      this.props.attemptLogin({ email: this.state.email, password: this.state.password });
    }
    this.syncStateToInputValue = (field, event) => {
      if(field === "email"){
        this.setState({...this.state, email: event.target.value});
      }else{
        this.setState({...this.state, password: event.target.value});
      }
    }
  }

  componentDidMount(){
    const authentication = this.props.authentication;
    if(authentication !== undefined && authentication.token !== undefined ){
      window.location.hash = "#/products";
    }
  }

  render() {
    return (
      <div style={{ flexGrow: '1', marginTop: '30px', width: 'calc(100% - 12px)' }}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={10} md={5} lg={4}>
            <Paper style={panelPadding}>
              <Typography type="display1" component="h3">
                Admin Login
              </Typography>
              <br />
              <form style={formStyle} noValidate autoComplete="off">
                <TextField
                  style={{ maxWidth: "20rem" }}
                  id="email"
                  label="Email"
                  fullWidth
                  margin="normal"
                  onChange={(event) => this.syncStateToInputValue("email", event)}
                />
                <TextField
                  style={{ maxWidth: "20rem" }}
                  id="password"
                  type="password"
                  label="Password"
                  fullWidth
                  margin="normal"
                  onChange={(event) => this.syncStateToInputValue("password", event)}
                />
              </form><br /><br />
              <Button
                raised color="accent" 
                onClick={this.login}
              >
                Sign in
              </Button>
              { this.props.authentication.loading && <CircularProgress color="accent" style={{ float: 'right', width: '30px'}} /> }
            </Paper>
          </Grid>
          <ChangeLogFeed />
        </Grid>
        <Registration open={this.props.registration.openRegistration} handleRequestClose={this.props.hideRegistration} />
        <Button style={{ position: 'fixed', bottom: '2rem', right: '2rem' }} raised color="accent" onClick={() => this.props.showRegistration()}>
          Create an Account
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.snackbar.open}
          autoHideDuration={3000}
          onRequestClose={this.props.hideSnackbar}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.snackbar.message}</span>}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ authentication, snackbar, registration }) => ({
  authentication,
  snackbar,
  registration
});

const mapDispatchToProps = {
  attemptLogin,
  hideSnackbar,
  showRegistration,
  hideRegistration
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);