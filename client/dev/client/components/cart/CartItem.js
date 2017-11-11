import React from 'react';

import Typography from 'material-ui/Typography';
import { ListItem, ListItemText } from 'material-ui/List';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';
import Avatar from 'material-ui/Avatar';

class CartItem extends React.Component {
	render() {
		return (
			<span>
				<ListItem>
	        <Avatar>
	          <ShoppingBasket />
	        </Avatar>
	        <ListItemText primary={`${this.props.item.brand} ${this.props.item.electronicType}`} secondary={`$${this.props.item.price} CDN`} />
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