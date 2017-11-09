import { connect } from 'react-redux';
import ProductList from '../products/ProductList';

import { showProductView } from '../../actions';

const mapStateToProps = state => {
    return {
        products: state.history.products,
        pagination: false
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onProductClick: (product) => {
            dispatch(showProductView(product));
        }
    };
}

const HistoryOfProductsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default HistoryOfProductsList;