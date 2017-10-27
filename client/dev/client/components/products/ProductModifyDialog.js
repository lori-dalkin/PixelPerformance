import { connect } from 'react-redux';
import ProductFieldPresentationDialog from './ProductFieldPresentationDialog';

import { modifyProduct as action } from '../../actions';

const mapStateToProps = ({product}) => ({
  product,
  loading: product.modifyProduct.modifyingProduct,
  title: 'Modify Product',
  actionButtonLabel: 'Modify',
  disableSelect: true
});

const mapDispatchToProps = {
  action
};

const ProductAddDialog = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductFieldPresentationDialog);

export default ProductAddDialog;