import { connect } from 'react-redux';
import ProductList from './ProductList';

import { showProductView } from '../../actions/index';

const getFilteredProducts = (products, filter) => {
    return products;
}

const mapStateToProps = state => {
    return {
        products: getFilteredProducts(state.product.products, state.product.productFilter)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onProductClick: (id, brand) => {
            dispatch(showProductView(id, brand))
        }
    };
}

const FilteredProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default FilteredProductList;