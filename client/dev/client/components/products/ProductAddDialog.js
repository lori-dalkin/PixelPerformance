import { connect } from 'react-redux';
import ProductDropDownsDialog from './ProductDropDownsDialog';

import { addProduct as action } from '../../actions';

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
)(ProductDropDownsDialog);

export default ProductAddDialog;