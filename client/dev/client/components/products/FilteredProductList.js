import { connect } from 'react-redux';
import ProductList from './ProductList';

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
        onProductClick: id => {
            dispatch(loadProductView(id))
        }
    };
}

const FilteredProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default FilteredProductList;