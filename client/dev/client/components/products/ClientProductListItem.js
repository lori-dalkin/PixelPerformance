import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import DetailsIcon from 'material-ui-icons/InfoOutline';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

import { TableCell, TableRow } from 'material-ui/Table';

const ClientProductListItem = ({ onClick, brand, price }) => (
    <TableRow>
        <TableCell>{brand}</TableCell>
        <TableCell numeric>{`$${price}`}</TableCell>
        <TableCell numeric>
            <Button onClick={onClick} color='primary'> <DetailsIcon /> View Details</Button>
            <Button color='primary'> <AddShoppingCartIcon /> Add to Cart</Button>
        </TableCell>
    </TableRow>
)

ClientProductListItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default ClientProductListItem;