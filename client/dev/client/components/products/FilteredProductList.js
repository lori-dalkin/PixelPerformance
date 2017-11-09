import { connect } from 'react-redux';
import ProductList from './ProductList';

import { showNextProductPage, showPreviousProductPage, showSpecificProductPage } from '../../actions/productView';
import { showProductView, showDeleteProduct } from '../../actions';

const mapStateToProps = state => {
    return {
        currPage: state.product.page,
        numPages: state.product.numPages,
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
        nextPage: () => {
            dispatch(showNextProductPage());
        },
        previousPage: () => {
            dispatch(showPreviousProductPage());
        },
        gotoPage: (number) => {
            dispatch(showSpecificProductPage(number))
        }
    };
}

const FilteredProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default FilteredProductList;