import React from 'react';

import Typography from 'material-ui/Typography';
import { ListItem, ListItemText } from 'material-ui/List';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';
import Avatar from 'material-ui/Avatar';

class CartItem extends React.Component {
	render() {
		let displayDate = new Date(this.props.item.lockedUntil);
		return (
			<span>
				<ListItem button>
	        <Avatar>
	          <ShoppingBasket />
	        </Avatar>
	        <ListItemText 
	        	primary={`${this.props.item.inventoryType.brand} ${this.props.item.inventoryType.electronicType}`}
	        	secondary={`$${this.props.item.inventoryType.price} CDN - Reserved until ${displayDate.toLocaleTimeString()}`} 
	        />
	      </ListItem>
      </span>
		);
	}
}

const mapStateToProps = ({authentication, cart, snackbar}) => ({
	authentication,
	cart,
	snackbar
});

const mapDispatchToProps = {};

export default CartItem;