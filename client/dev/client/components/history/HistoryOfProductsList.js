import { connect } from 'react-redux';
import ProductList from '../products/ProductList';

import { showProductView, showRefundDialog } from '../../actions';

const mapStateToProps = state => {
    return {
        products: state.history.products,
        pagination: false,
        deleteLabel: "Refund"
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onProductClick: (product) => {
            dispatch(showProductView(product));
        },
        onProductDelete: (product) => {
            dispatch(showRefundDialog(product));
        }
    };
}

const HistoryOfProductsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default HistoryOfProductsList;