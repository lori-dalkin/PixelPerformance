import React from 'react';
import { connect } from 'react-redux';
import FilteredProductList from './FilteredProductList';
import ProductViewDialog from './ProductViewDialog';
import { getProducts, hideProductView } from '../../actions';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';

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
							{ this.props.product.ifFetching && <CircularProgress color="accent" style={{ width: '30px'}} /> }
							<FilteredProductList />
						</Paper>
					</Grid>
				</Grid>
				<ProductViewDialog open={this.props.product.productViewOpen} handleRequestClose={this.props.hideProductView} />
				<Button style={{ position: 'fixed', bottom: '2rem', right: '2rem' }} fab color="accent" aria-label="add">
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
		hideProductView: () => dispatch(hideProductView())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);