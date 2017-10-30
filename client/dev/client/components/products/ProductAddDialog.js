import { connect } from 'react-redux';
import ProductFieldPresentationDialog from './ProductFieldPresentationDialog';

import { addProduct as action } from '../../actions/adminProductActions';

const mapStateToProps = ({product}) => ({
  product,
  loading: product.addProduct.addingProduct,
  title: 'Add Product',
  actionButtonLabel: 'Add'
});

const mapDispatchToProps = {
  action
};

const ProductAddDialog = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductFieldPresentationDialog);

export default ProductAddDialog;