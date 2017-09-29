import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button'; 
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import { setToken, deleteToken } from '../../actions/index';

class ProductViewDialog extends Component {

	render() {
		const classes = this.props.classes;
		return (
				<Dialog open={this.props.open} transition={Slide} onRequestClose={this.props.handleRequestClose}>
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.props.handleRequestClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
		  )
	}

};

const mapStateToProps = ({ product }) => ({
  product
});

const mapDispatchToProps = {
	setToken,
	deleteToken
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductViewDialog);