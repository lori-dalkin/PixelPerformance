import React from 'react';
import { connect } from 'react-redux';
import FilteredProductList from './FilteredProductList';
import ProductViewDialog from './ProductViewDialog';
import ProductAddDialog from './ProductAddDialog';
import ProductTypeDropdown from './ProductTypeDropdown';
import ProductDeleteDialog from './ProductDeleteDialog';
import { getProducts, hideProductView, showAddProduct, hideAddProduct, hideDeleteProduct } from '../../actions';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

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
					<Grid item xs={11} md={10} lg={6} >
						<Paper style={productPaperStyle}>
							<Grid container spacing={24} justify='center'>
								<Grid item xs={9}>
									<Typography type='display1' gutterBottom component='h3'>
										Product Listing
									</Typography>
								</Grid>
								<Grid item xs={3}>
									<ProductTypeDropdown />
								</Grid>
							</Grid>
							{ this.props.product.isFetching && <LinearProgress color="accent" style={{ width: '100%' }} /> }
							{ !this.props.product.isFetching && <FilteredProductList /> }
						</Paper>
					</Grid>
				</Grid>
				<ProductDeleteDialog open={this.props.product.productDeleteOpen} handleRequestClose={this.props.hideProductDelete} />
				<ProductViewDialog open={this.props.product.productViewOpen} handleRequestClose={this.props.hideProductView} />
				<ProductAddDialog open={this.props.product.addProduct.addProductOpen} handleRequestClose={this.props.hideAddProduct} />
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
		onLoad: (filter = "") => {
			dispatch(getProducts(filter));
		},
		showAddProduct: () => {
			dispatch(showAddProduct());
		},
		hideAddProduct: () => {
			dispatch(hideAddProduct());
		},
		hideProductView: () => dispatch(hideProductView()),
		hideProductDelete: () => dispatch(hideDeleteProduct())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);