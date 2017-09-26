import React from 'react';
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
    primary: blue, // Purple and green play nicely together.
    secondary: pink
  }
});

function App(props) {
	
	const classes = props.classes;
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
			    <Route exact path="/" />
			    <Route path="/admin" component={Login} />
			  </div>
		  </MuiThemeProvider>
	  </Router>
	  )

};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
