import React from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const ProductList = ({products, onProductClick, onProductDelete, previousPage, nextPage, showPrevious }) => {
  let productId = 1;
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
            {products.map(product => (
              <ProductListItem 
                key={productId++}
                {...product}
                onClick={ () => onProductClick(product) } 
                onDelete={ () => onProductDelete(product) }
              />
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          { showPrevious && <Button onClick={() => previousPage()} color="primary">
                              Previous page
                            </Button>
          }
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => nextPage()} color="primary">
            Next Page
          </Button>
        </Grid>
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
    onProductDelete: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    previousPage: PropTypes.func.isRequired,
    showPrevious: PropTypes.bool.isRequired
};

export default ProductList;