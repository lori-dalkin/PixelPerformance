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

class ProductViewDialog extends Component {

	render() {
		return (
				<Dialog open={this.props.open} transition={Slide} onRequestClose={this.props.handleRequestClose}>
          <DialogTitle>{`Item ${this.props.product.selectedProduct.brand} ${this.props.product.selectedProduct.electronicType}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>ID: </strong>{this.props.product.selectedProduct.id}<br/>
              <strong>Brand: </strong>{this.props.product.selectedProduct.brand}<br/>
              <strong>Size: </strong>{this.props.product.selectedProduct.size}<br/>
              <strong>Type: </strong>{this.props.product.selectedProduct.electronicType}<br/>
              <strong>Price: </strong>{`$${this.props.product.selectedProduct.weight} CDN`}<br/>
              <strong>Weight: </strong>{`${this.props.product.selectedProduct.weight} lbs`}<br/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestClose} color="primary">
              Back
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductViewDialog);