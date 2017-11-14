import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/DeleteForever';
import DetailsIcon from 'material-ui-icons/InfoOutline';
import AssignmentReturnIcon from 'material-ui-icons/AssignmentReturn';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

import { TableCell, TableRow } from 'material-ui/Table';

const ProductListItem = ({ userType, onClick, onAdd, brand, price, onDelete, deleteLabel, pageType }) => (
	<TableRow>
    <TableCell>{brand}</TableCell>
    <TableCell numeric>{`$${price}`}</TableCell>
    <TableCell numeric>
    	<Button onClick={onClick} color='primary'> <DetailsIcon /> View Details</Button>
        {userType === "Client" && pageType != "history" ? null :
            <Button onClick={onDelete} color='accent'> 
              { pageType == "history" ? (
                  <AssignmentReturnIcon />
                ) : (
                  <DeleteIcon /> 
              )}
              { deleteLabel }
            </Button>
        }
    </TableCell>
  </TableRow>
)

ProductListItem.propTypes = {
  userType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteLabel: PropTypes.string.isRequired,
  pageType: PropTypes.string
};

export default ProductListItem;