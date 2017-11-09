import React from 'react';
import PropTypes from 'prop-types';
import ClientProductListItem from './ClientProductListItem';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const ClientProductList = ({products, onProductClick, onAddToCartClick, previousPage, nextPage, showPrevious, showNext }) => {
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
                            <ClientProductListItem
                                key={productId++}
                                {...product}
                                onClick={ () => onProductClick(product)}
                                onAdd={ () => onAddToCartClick(product)}
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
                    { showNext && <Button onClick={() => nextPage()} color="primary">
                        Next Page
                    </Button>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

ClientProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            brand: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        }).isRequired
    ).isRequired,
    onProductClick: PropTypes.func.isRequired,
    onAddToCartClick: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    previousPage: PropTypes.func.isRequired,
    showPrevious: PropTypes.bool.isRequired,
    showNext: PropTypes.bool.isRequired
};

export default ClientProductList;