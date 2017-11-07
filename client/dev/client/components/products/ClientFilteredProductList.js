import { connect } from 'react-redux';
import ClientProductList from './ClientProductList';

import { showNextProductPage, showPreviousProductPage } from '../../actions/productView';
import { showProductView } from '../../actions';

const mapStateToProps = state => {
    return {
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
        nextPage: () => {
            dispatch(showNextProductPage());
        },
        previousPage: () => {
            dispatch(showPreviousProductPage());
        }
    };
}

const ClientFilteredProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientProductList);

export default ClientFilteredProductList;