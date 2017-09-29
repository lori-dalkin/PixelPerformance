import React from 'react';
import { connect } from 'react-redux';
import FilteredProductList from './FilteredProductList';
import { getProducts } from '../../actions';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
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
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authentication: state.authentication,
		product: state.product
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onLoad: (filter = "") => {
			dispatch(getProducts(filter));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);