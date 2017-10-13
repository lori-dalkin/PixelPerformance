import { connect } from 'react-redux';
import ProductDropDownsDialog from './ProductFieldPresentationDialog';

import { modifyProduct as action } from '../../actions';

const mapStateToProps = ({product}) => ({
  product,
  loading: product.modifyProduct.modifyingProduct,
  title: 'Modify Product',
  actionButtonLabel: 'Modify'
});

const mapDispatchToProps = {
  action
};

const ProductAddDialog = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductDropDownsDialog);

export default ProductAddDialog;