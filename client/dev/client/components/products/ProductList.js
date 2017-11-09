import React from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Table, { TableBody, TableCell, TableHead, TableFooter, TableRow, TablePagination } from 'material-ui/Table';

const ProductList = ({ products, onProductClick, onProductDelete, currPage, numItems, numItemsPerPage, gotoPage, changeRowsPerPage, pagination }) => {
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
                onClick={ () => onProductClick(product) } 
                onDelete={ () => onProductDelete(product) }
              />
            ))}
          </TableBody>
          { pagination &&
            (<TableFooter>
              <TableRow>
                <TablePagination
                  count={numItems}
                  rowsPerPage={numItemsPerPage}
                  page={currPage - 1}
                  onChangePage={gotoPage}
                  onChangeRowsPerPage={changeRowsPerPage}
                />
              </TableRow>
            </TableFooter>)
          }
        </Table>
      </Grid>
    </Grid>
  );
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            brand: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        }).isRequired
    ).isRequired,
    onProductClick: PropTypes.func.isRequired,
    pagination: PropTypes.bool.isRequired,
    onProductDelete: PropTypes.func,
    currPage: PropTypes.number,
    gotoPage: PropTypes.func,
    changeRowsPerPage: PropTypes.func,
    numItems: PropTypes.number,
    numItemsPerPage: PropTypes.number
};

export default ProductList;