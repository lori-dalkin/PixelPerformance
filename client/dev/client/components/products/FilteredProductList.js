import { connect } from 'react-redux';
import ProductList from './ProductList';

import { showProductView, showDeleteProduct, showNextProductPage, showPreviousProductPage } from '../../actions';

const mapStateToProps = state => {
    return {
        products: state.product.products,
        showPrevious: state.product.page > 1
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onProductClick: (product) => {
            dispatch(showProductView(product));
        },
        onProductDelete: (product) => {
            dispatch(showDeleteProduct(product));
        },
        nextPage: () => {
            dispatch(showNextProductPage());
        },
        previousPage: () => {
            dispatch(showPreviousProductPage());
        }
    };
}

const FilteredProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default FilteredProductList;