import React from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const ProductList = ({ products, onProductClick, onProductDelete, currPage, numPages, previousPage, gotoPage, nextPage, showPrevious, showNext }) => {
  let numPagesShowing = Math.min(3, numPages);
  let firstPage = 1;

  if (numPages > 3) {
    firstPage = Math.max(1, currPage - Math.floor(numPagesShowing / 2))
  }

  let pages = [];

  for (var i = firstPage; i <= numPages && i < firstPage + numPagesShowing; i++) {
    pages.push(i);
  }

  let width = Math.max(2, Math.floor(12 / (numPagesShowing + 2)));

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
        </Table>
      </Grid>
      <Grid container justify='center'>
        <Grid item xs={width}>
          { showPrevious && <Button onClick={() => previousPage()} color="primary">
                              &lt;
                            </Button>
          }
        </Grid>
        { pages.map(index => {
            let color = "accent";

            if (index == currPage) {
              color = "primary";
            }

            return (
              <Grid key={index} item xs={width}>
                  <Button onClick={() => gotoPage(index)} color={color}>
                    { index }
                  </Button>
              </Grid>
            )
          })
        }
        <Grid item xs={width}>
          { showNext && <Button onClick={() => nextPage()} color="primary">
                          &gt;
                        </Button>
          }
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
    currPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
    previousPage: PropTypes.func.isRequired,
    gotoPage: PropTypes.func.isRequired,
    showPrevious: PropTypes.bool.isRequired,
    showNext: PropTypes.bool.isRequired
};

export default ProductList;