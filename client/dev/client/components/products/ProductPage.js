import React from 'react';
import { connect } from 'react-redux';
import FilteredProductList from './FilteredProductList';
import { getProducts } from '../../actions';

class ProductPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		return (
			<FilteredProductList />
		);
	}
}

const mapStateToProps = state => {
	return {
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