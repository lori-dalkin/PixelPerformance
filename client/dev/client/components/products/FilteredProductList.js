import { connect } from 'react-redux';
import ProductList from './ProductList';

import { showNextProductPage, showPreviousProductPage } from '../../actions/productView';
import { showProductView, showDeleteProduct } from '../../actions';
import { addToCart } from '../../actions/clientProductActions';

const mapStateToProps = state => {
    return {
        userType: state.authentication.userType,
        products: state.product.products,
        showPrevious: state.product.page > 1,
        showNext: state.product.maxPage == undefined || state.product.page < state.product.maxPage
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
        onAddToCartClick: (product) => {
            dispatch(addToCart(product))
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