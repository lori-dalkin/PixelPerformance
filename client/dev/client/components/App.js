import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar'; 
import Typography from 'material-ui/Typography';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
require('../../scss/style.scss');

import { setToken, deleteToken } from '../actions/index';
import Login from './authentication/Login';

const styles = theme => ({
	root: {
    width: '100%',
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
});

const getCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

class App extends Component {
	
	componentWillMount(){
		const token = getCookie("token");
		if(token !== undefined){
			this.props.setToken(token);
		}
	}

	componentWillReceiveProps(nextProps){
		const authentication = nextProps.authentication;
		if(authentication === undefined ||  
			 authentication.token === undefined){
			window.location.hash = "#/";
		}
		else if(window.location.hash === "#/" && authentication !== undefined && authentication.token !== undefined ){
			window.location.hash = "#/products";
		}
	}

	render() {
		const classes = this.props.classes;
		return (
			<Router>
			  <MuiThemeProvider theme={theme}>
				  <div className={classes.root}>
				    <AppBar position="static">
					    <Toolbar>
					    	<Typography style={{ flex: '1' }} type="title" color="inherit">
					        Pixel Performance
					      </Typography>
					      {	this.props.authentication.token !== undefined && 
					      	<Button color="contrast" onClick={this.props.deleteToken}>Logout</Button> 
					      }
				      </Toolbar>
				    </AppBar>
				    <Route exact path="/" component={Login} />
				    <Route path="/products" />
				  </div>
			  </MuiThemeProvider>
		  </Router>
		  )
	}

};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authentication }) => ({
  authentication
});

const mapDispatchToProps = {
	setToken,
	deleteToken
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
