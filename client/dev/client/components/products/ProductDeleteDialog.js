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

class ProductDeleteDialog extends Component {

	render() {
    const message = `Are you sure you wish to delete this ${this.props.product.selectedProduct.brand} 
      ${this.props.product.selectedProduct.electronicType} product and all inventory associated with it?`;
		return (
				<Dialog open={this.props.open} transition={Slide} onRequestClose={this.props.handleRequestClose}>
          <DialogTitle>Delete Product?</DialogTitle>
          <DialogContent>
            <DialogContentText>{message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestClose} color="accent">
              Delete
            </Button>
            <Button onClick={this.props.handleRequestClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
		  )
	}

};

const mapStateToProps = ({ product }) => ({
  product
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDeleteDialog);