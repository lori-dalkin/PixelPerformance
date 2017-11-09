import { connect } from 'react-redux';
import ProductList from './ProductList';

import { showNextProductPage, showPreviousProductPage, showSpecificProductPage, setRowsPerPage, setPage } from '../../actions/productView';
import { showProductView, showDeleteProduct } from '../../actions';
import { addToCart } from '../../actions/clientProductActions';

const mapStateToProps = state => {
    return {
        userType: state.authentication.userType,
        currPage: state.product.page,
        numPages: state.product.numPages,
        products: state.product.products,
        numItems: state.product.numProducts,
        numItemsPerPage: state.product.productsPerPage
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
        gotoPage: (event, number) => {
            dispatch(showSpecificProductPage(number + 1));
        },
        changeRowsPerPage: (event) => {
            dispatch(setPage(1));
            dispatch(setRowsPerPage(event.target.value));
        }
    };
}

const FilteredProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default FilteredProductList;