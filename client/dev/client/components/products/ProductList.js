import React from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';
import Grid from 'material-ui/Grid';

const ProductList = ({products, onProductClick}) => {
    let productId = 1;
    return (
        <Grid container spacing={8} style={{ margin: '0px', marginTop: '5px' }}>
            {products.map(product => (
              <ProductListItem key={productId++} {...product} onClick={ () => onProductClick(product) } />
            ))}
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
    onProductClick: PropTypes.func.isRequired
};

export default ProductList;