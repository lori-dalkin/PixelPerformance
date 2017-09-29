import React from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';

const ProductList = (product, onProductClick) => {
    <Grid container spacing={8}>
        {products.map(product => (
          <ProductListItem key={product.id} {...product} onClick={() => onProductClick(product.id)}
        ))}
    </Grid>
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.nunmber.isRequired,
            picture: PropTypes.string.isRequired
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    onProductClick: PropTypes.func.isRequired
};

export default ProductList;