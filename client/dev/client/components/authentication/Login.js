import React, {Component} from 'react';
import {connect} from 'react-redux';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import { attemptLogin } from '../../actions/index';

const panelPadding = {
  padding: '2rem',
}

const formStyle = {
  display: 'flex',
  flexWrap: 'wrap'
}

class Login extends Component {
  render() {
    return (
      <div style={{ flexGrow: '1', marginTop: '30px' }}>
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
                  id="username"
                  label="Username"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  style={{ maxWidth: "20rem" }}
                  id="password"
                  type="password"
                  label="Password"
                  fullWidth
                  margin="normal"
                />
              </form><br /><br />
              <Button raised color="accent" onClick={attemptLogin}>
                Sign in
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={10} md={5} lg={4}>
            <Paper style={panelPadding}>
              <Typography type="display1" component="h3">
                Latest Updates
              </Typography><br /><br />
              <Typography type="title">New features this iteration</Typography>
              <Typography type="body2">
                <ul>
                  <li>Implemented new administrator secured login</li>
                  <li>Implemented table of available products with filters</li>
                  <li>Implemented add new product modal for administrator only</li>
                  <li>Implemented view product details from product listing</li>
                  <li>Setup react redux boilerplate with webpack</li>
                  <li>Setup material ui components in react stack</li>
                </ul>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
  authentication
});

const mapDispatchToProps = {
  attemptLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);