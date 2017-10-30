import { connect } from 'react-redux';
import ProductFieldPresentationDialog from './ProductFieldPresentationDialog';

import { modifyProduct as action } from '../../actions/adminProductActions';

const mapStateToProps = ({product}) => ({
  product,
  loading: product.modifyProduct.modifyingProduct,
  title: 'Modify Product',
  disableSelect: true,
  actionButtonLabel: 'Save Changes'
});

const mapDispatchToProps = {
  action
};

const ProductAddDialog = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductFieldPresentationDialog);

export default ProductAddDialog;