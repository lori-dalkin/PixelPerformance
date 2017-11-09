import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/DeleteForever';
import DetailsIcon from 'material-ui-icons/InfoOutline';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

import { TableCell, TableRow } from 'material-ui/Table';

const ProductListItem = ({ userType, onClick, onAdd, brand, price, onDelete }) => (
	<TableRow>
    <TableCell>{brand}</TableCell>
    <TableCell numeric>{`$${price}`}</TableCell>
    <TableCell numeric>
    	<Button onClick={onClick} color='primary'> <DetailsIcon /> View Details</Button>
        {userType === "Client" ? null :
            <Button onClick={onDelete} color='accent'> <DeleteIcon /> Delete</Button>
        }
        {userType === "Admin" ? null :
            <Button onClick={onAdd} color='primary'> <AddShoppingCartIcon /> Add to Cart</Button>
        }
    </TableCell>
  </TableRow>
)

ProductListItem.propTypes = {
  userType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default ProductListItem;