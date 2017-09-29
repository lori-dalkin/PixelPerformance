import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

const ProductListItem = ({ onClick, brand, price }) => (
    <Grid container spacing={24} style={{ margin: '-6px' }}>
    	<Grid item xs={6}>
	    	<Typography type='headline' component='p'>
				{brand}
			</Typography>
		</Grid>
		<Grid item xs={3}>
			<Typography type='subheading' component='p'>
				{price}
			</Typography>
		</Grid>
		<Grid item xs={3}>
			<Button 
				raised 
				color='primary'
				onClick={ () => onClick() }
			>
				View Info
			</Button>
		</Grid>
    </Grid>
)

ProductListItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default ProductListItem;