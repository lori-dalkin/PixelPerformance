import React from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Table, { TableBody, TableCell, TableHead, TableFooter, TableRow, TablePagination } from 'material-ui/Table';

const ProductList = ({ userType, products, onProductClick, onProductDelete, onAddToCartClick, currPage, numItems, numItemsPerPage, gotoPage, changeRowsPerPage }) => {
  return (
    <Grid container spacing={8} style={{ margin: '0px', marginTop: '5px' }}>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Brand</TableCell>
              <TableCell numeric>Price</TableCell>
              <TableCell numeric>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <ProductListItem 
                key={index}
                {...product}
                userType={userType}
                onClick={ () => onProductClick(product) } 
                onDelete={ () => onProductDelete(product) }
                onAdd={ () => onAddToCartClick(product)}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={numItems}
                rowsPerPage={numItemsPerPage}
                page={currPage - 1}
                onChangePage={gotoPage}
                onChangeRowsPerPage={changeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>
    </Grid>
  );
}

ProductList.propTypes = {
    userType: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            brand: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        }).isRequired
    ).isRequired,
    onProductClick: PropTypes.func.isRequired,
    onProductDelete: PropTypes.func.isRequired,
    onAddToCartClick: PropTypes.func.isRequired,
    currPage: PropTypes.number.isRequired,
    gotoPage: PropTypes.func.isRequired,
    changeRowsPerPage: PropTypes.func.isRequired,
    numItems: PropTypes.number.isRequired,
    numItemsPerPage: PropTypes.number.isRequired
};

export default ProductList;