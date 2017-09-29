import React from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';
import Grid from 'material-ui/Grid';

const ProductList = ({products, onProductClick}) => {
    return (
        <Grid container spacing={8}>
            {products.map(product => (
              <ProductListItem key={product.id} {...product} onClick={ () => onProductClick(product.id) } />
            ))}
        </Grid>
    );
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    onProductClick: PropTypes.func.isRequired
};

export default ProductList;