import React from 'react';
import { connect } from 'react-redux';
import FilteredProductList from './FilteredProductList';
import ProductViewDialog from './ProductViewDialog';
import ProductAddDialog from './ProductAddDialog';
import ProductTypeDropdown from './ProductTypeDropdown';
import { getProducts, hideProductView, showAddProduct, hideAddProduct } from '../../actions';

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

    componentDidUpdate() {
        if(this.props.product.filterSet){
            this.props.onReload();
		}
    }

	render() {
		return (
			<div style={{ marginTop: '30px' }}> 
				<Grid container spacing={24} justify='center'>
					<Grid item xs={6} >
						<Paper style={productPaperStyle}>
							<Grid container spacing={24} justify='center'>
								<Grid item xs={9}>
									<Typography type='display1' component='h3'>
										Products
									</Typography>
								</Grid>
								<Grid item xs={3}>
									<ProductTypeDropdown />
								</Grid>
							</Grid>
							{ this.props.product.isFetching && <CircularProgress color="accent" style={{ width: '30px'}} /> }
							<FilteredProductList />
						</Paper>
					</Grid>
				</Grid>
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
        onReload: () => {
            dispatch(getProducts());
        },
		showAddProduct: () => {
			dispatch(showAddProduct());
		},
		hideAddProduct: () => {
			dispatch(hideAddProduct());
		},
		hideProductView: () => dispatch(hideProductView())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);