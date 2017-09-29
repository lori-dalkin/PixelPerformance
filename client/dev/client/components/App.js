import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar'; 
import Typography from 'material-ui/Typography';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
require('../../scss/style.scss');

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

class App extends Component {
	
	componentDidMount(){
		const authentication = this.props.authentication;
		if(authentication === undefined || 
			 authentication.user === undefined || 
			 authentication.token === undefined){
			window.location.hash = "#/";
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
					    	<Typography type="title" color="inherit">
					        Fin Fin Tech Application
					      </Typography>
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
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
