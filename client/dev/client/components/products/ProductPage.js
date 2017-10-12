import React from 'react';
import { connect } from 'react-redux';
import FilteredProductList from './FilteredProductList';
import ProductViewDialog from './ProductViewDialog';
import ProductAddDialog from './ProductAddDialog';
import ProductModifyDialog from './ProductModifyDialog';
import { getProducts, hideProductView, showAddProduct, hideAddProduct, showModifyProduct, hideModifyProduct } from '../../actions';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

const productPaperStyle = {
	padding: '2em'
};

class ProductPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		return (
			<div style={{ marginTop: '30px' }}> 
				<Grid container spacing={24} justify='center'>
					<Grid item xs={6} >
						<Paper style={productPaperStyle}>
							<Typography type='display1' component='h3'>
								Products
							</Typography>
							{ this.props.product.isFetching && <CircularProgress color="accent" style={{ width: '30px'}} /> }
							<FilteredProductList />
						</Paper>
					</Grid>
				</Grid>
				<ProductViewDialog open={this.props.product.productViewOpen} handleRequestClose={this.props.hideProductView} />
				<ProductAddDialog open={this.props.product.addProduct.addProductOpen} handleRequestClose={this.props.hideAddProduct} />
				<ProductModifyDialog open={this.props.product.modifyProduct.modifyProductOpen} handleRequestClose={this.props.hideModifyProduct} />
				<Button style={{ position: 'fixed', bottom: '2rem', right: '2rem' }} fab color="accent" aria-label="add" onClick={ () => this.props.showAddProduct() }>
	        		<AddIcon />
	      		</Button>
			</div>
		);
	}
}

const mapStateToProps = ({authentication, product}) => ({
	authentication,
	product
});

const mapDispatchToProps = dispatch => {
	return {
		onLoad: (filter = "") => dispatch(getProducts(filter)),
		showAddProduct: () => dispatch(showAddProduct()),
		hideAddProduct: () => dispatch(hideAddProduct()),
		hideProductView: () => dispatch(hideProductView()),
		showModifyProduct: () => dispatch(showModifyProduct()),
		hideModifyProduct: () => dispatch(hideModifyProduct())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);