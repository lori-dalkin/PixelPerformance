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
import IconButton from 'material-ui/IconButton';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline';

import { addToInventory, removeFromInventory, fetchInventory } from '../../actions/adminProductActions';
import { showModifyProduct } from '../../actions';
import { addToCart } from '../../actions/clientProductActions';

class ProductViewDialog extends Component {

  constructor(props){
    super(props);
    this.state = {
      showInventory: false,
      inventory: 0
    }

    this.toggleInventoryView = () => {
      this.setState({ ...this.state, showInventory: !this.state.showInventory });
    }

    this.addInventory = () => {
      this.setState({ ...this.state, inventory: this.state.inventory + 1 });
      this.props.addToInventory(this.props.product.selectedProduct.id);
    }

    this.removeInventory = () => {
      this.setState({ ...this.state, inventory: Math.max(this.state.inventory - 1, 0) });
      if(this.state.inventory > 0){
        this.props.removeFromInventory(this.props.product.selectedProduct.id);
      }
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({ ...this.state, inventory: nextProps.product.inventoryCount });
  }

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
              <strong>Price: </strong>{`$${this.props.product.selectedProduct.price} CDN`}<br/>
              <strong>Weight: </strong>{`${this.props.product.selectedProduct.weight} lbs`}<br/>
              {this.props.authentication.userType === "Client"  && <span><strong>In Stock: </strong>{this.state.inventory}</span> }
            </DialogContentText>
            { this.state.showInventory &&
              <span>
                <hr/>
                <DialogContentText>
                  <strong>Current Inventory Count: </strong>{this.state.inventory}<br/>
                  { !this.props.product.isFetchingInventory &&
                    <span>
                      <IconButton  onClick={this.removeInventory}><RemoveCircleOutline/></IconButton>
                      <IconButton  onClick={this.addInventory}><AddCircleOutline/></IconButton>
                    </span>
                  }
                  { this.props.product.isFetchingInventory &&
                    <span>
                      <IconButton  disabled><RemoveCircleOutline/></IconButton>
                      <IconButton  disabled><AddCircleOutline/></IconButton>
                    </span>
                  }
                </DialogContentText>
              </span>
            }
          </DialogContent>
          <DialogActions>
           {this.props.authentication.userType === "Client" ? null :
               <Button onClick={ () => this.toggleInventoryView() } color='primary'>
                    { this.state.showInventory ? "Hide Inventory" : "Show Inventory" }
                  </Button>
           }
            {this.props.authentication.userType === "Client" ? null :
                <Button onClick={ () => this.props.showModifyProduct(this.props.product.selectedProduct) } color='primary'>
                Modify
                </Button>
            }
              {this.props.authentication.userType === "Admin" ? null :
                  <Button onClick={ () => this.props.addToCart(this.props.product.selectedProduct) } color='primary'>
                    Add to Cart
                  </Button>
              }

             <Button onClick={this.props.handleRequestClose} color="default">
               Back
             </Button>
           </DialogActions>
        </Dialog>
		  )
	}

};

const mapStateToProps = ({ product, authentication }) => ({
  product,
    authentication
});

const mapDispatchToProps = {
  showModifyProduct,
  addToInventory,
  removeFromInventory,
  addToCart,
  fetchInventory
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductViewDialog);