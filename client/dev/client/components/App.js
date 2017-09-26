import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
require('../../scss/style.scss');

const styles = theme => ({
	root: {
    width: '100%',
  }
});

function App(props) {
	
	const classes = props.classes;
	return (
	  <div className={classes.root}>
	    <AppBar position="static">
		    <Toolbar>
		    	<Typography type="title" color="inherit">
		        Soen 343
		      </Typography>
	      </Toolbar>
	    </AppBar>
	  </div>)

};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
