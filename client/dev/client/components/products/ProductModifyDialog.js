import { connect } from 'react-redux';
import ProductDropDownsDialog from './ProductDropDownsDialog';

import { modifyProduct as action } from '../../actions';

const mapStateToProps = ({product}) => ({
  product,
  loading: product.modifyProduct.modifyingProduct,
  title: 'Modify Product'
});

const mapDispatchToProps = {
  action
};

const ProductAddDialog = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductDropDownsDialog);

export default ProductAddDialog;