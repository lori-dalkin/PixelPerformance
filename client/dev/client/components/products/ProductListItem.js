import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

const ProductListItem = ({ onClick, picture, name, price }) => (
    <Grid item xs={12}>

    </Grid>
)

ProductListItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default ProductListItem;