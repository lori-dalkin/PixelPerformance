import React from 'react';
import { connect } from 'react-redux';
import FilteredProductList from './FilteredProductList';
import ProductViewDialog from './ProductViewDialog';
import ProductAddDialog from './ProductAddDialog';
import ProductModifyDialog from './ProductModifyDialog';
import ProductDeleteDialog from './ProductDeleteDialog';
import * as actions from '../../actions';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
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
				<Grid container spacing={0} justify='center'>
					<Grid item xs={11} md={10} lg={6} >
						<Paper style={productPaperStyle}>
							<Typography type='display1' gutterBottom component='h3'>
								Product Listing
							</Typography>
							{ this.props.product.isFetching && <LinearProgress color="accent" style={{ width: '100%' }} /> }
							{ !this.props.product.isFetching && <FilteredProductList /> }
						</Paper>
					</Grid>
				</Grid>
				<ProductDeleteDialog open={this.props.product.productDeleteOpen} handleRequestClose={this.props.hideProductDelete} />
				<ProductViewDialog open={this.props.product.productViewOpen} handleRequestClose={this.props.hideProductView} />
				<ProductAddDialog open={this.props.product.addProduct.addProductOpen} handleRequestClose={this.props.hideAddProduct} />
				<ProductModifyDialog open={this.props.product.modifyProduct.modifyProductOpen} handleRequestClose={this.props.hideModifyProduct} />
				<Button style={{ position: 'fixed', bottom: '2rem', right: '2rem' }} fab color="accent" aria-label="add" onClick={ () => this.props.showAddProduct() }>
	        		<AddIcon />
	      		</Button>
	      		<Snackbar
		          anchorOrigin={{
		            vertical: 'bottom',
		            horizontal: 'left',
		          }}
		          open={this.props.snackbar.open}
		          autoHideDuration={3000}
		          onRequestClose={this.props.hideSnackbar}
		          SnackbarContentProps={{
		            'aria-describedby': 'message-id',
		          }}
		          message={<span id="message-id">{this.props.snackbar.message}</span>}
		        />
			</div>
		);
	}
}

const mapStateToProps = ({authentication, product, snackbar}) => ({
	authentication,
	product,
	snackbar
});

const mapDispatchToProps = dispatch => {
	return {
		onLoad: (filter = "") => dispatch(actions.getProducts(filter)),
		showAddProduct: () => dispatch(actions.showAddProduct()),
		hideAddProduct: () => dispatch(actions.hideAddProduct()),
		hideProductView: () => dispatch(actions.hideProductView()),
		showModifyProduct: () => dispatch(actions.showModifyProduct()),
		hideModifyProduct: () => dispatch(actions.hideModifyProduct()),
		hideProductDelete: () => dispatch(actions.hideDeleteProduct()),
		hideSnackbar: () => dispatch(actions.hideSnackbar())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);