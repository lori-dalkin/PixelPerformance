import React from 'react';
import { connect } from 'react-redux';
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

class CartView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{ marginTop: '30px' }}> 
				<Grid container spacing={0} justify='center'>
					<Grid item xs={11} md={10} lg={6} >
						<Paper style={productPaperStyle}>
							<Grid container spacing={24} justify='center'>
								<Grid item xs={9}>
									<Typography type='display1' gutterBottom component='h3'>
										Cart Items
									</Typography>
								</Grid>
							</Grid>
							{ this.props.cart.isFetching && <LinearProgress color="accent" style={{ width: '100%' }} /> }
							{ !this.props.cart.isFetching  }
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = ({authentication, cart, snackbar}) => ({
	authentication,
	cart,
	snackbar
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CartView);