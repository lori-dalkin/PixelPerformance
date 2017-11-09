import { connect } from 'react-redux';
import ProductList from './ProductList';

import { showNextProductPage, showPreviousProductPage, showSpecificProductPage, setRowsPerPage } from '../../actions/productView';
import { showProductView, showDeleteProduct } from '../../actions';

const mapStateToProps = state => {
    return {
        currPage: state.product.page,
        numPages: state.product.numPages,
        products: state.product.products,
        numItems: state.product.numProducts,
        numItemsPerPage: state.product.productsPerPage,
        pagination: true
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
        gotoPage: (event, number) => {
            dispatch(showSpecificProductPage(number + 1));
        },
        changeRowsPerPage: (event) => {
            dispatch(setRowsPerPage(event.target.value));
        }
    };
}

const FilteredProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default FilteredProductList;