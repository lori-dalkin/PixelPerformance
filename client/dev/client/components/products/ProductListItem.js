import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/DeleteForever';
import DetailsIcon from 'material-ui-icons/InfoOutline';
import EditIcon from 'material-ui-icons/ModeEdit';

import { TableBody, TableCell, TableRow } from 'material-ui/Table';

const ProductListItem = ({ onClick, brand, price, onDelete, onModify }) => (
	<TableRow>
    <TableCell>{brand}</TableCell>
    <TableCell numeric>{`$${price}`}</TableCell>
    <TableCell numeric>
    	<Button onClick={onClick} color='primary'> <DetailsIcon /> View Details</Button>
      <Button onClick={onModify} color='default'> <EditIcon /> Modify</Button>
    	<Button onClick={onDelete} color='accent'> <DeleteIcon /> Delete</Button>
    </TableCell>
  </TableRow>
)

ProductListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModify: PropTypes.func.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default ProductListItem;