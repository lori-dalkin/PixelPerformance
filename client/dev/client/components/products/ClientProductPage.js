import React from 'react';
import { connect } from 'react-redux';
import ClientFilteredProductList from './ClientFilteredProductList';
import ProductViewDialog from './ProductViewDialog';
import * as actions from '../../actions';
import { getProducts } from '../../actions/productView';
import {Card, CardActions, CardHeader, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import { LinearProgress } from 'material-ui/Progress';

const productPaperStyle = {
    padding: '2em'
};

class ClientProductPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        return (
        <div>
            <div style={{ marginTop: '30px' }}>

            </div>
            <div style={{ marginTop: '30px' }}>
                <Grid container spacing={0} justify='center'>
                    <Grid item xs={11} md={10} lg={6} >
                        <Paper style={productPaperStyle}>
                            <Grid container spacing={24} justify='center'>
                                <Grid item xs={9}>
                                    <Typography type='display1' gutterBottom component='h3'>
                                        Product Listing
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                            </Grid>
                            { this.props.product.isFetching && <LinearProgress color="accent" style={{ width: '100%' }} /> }
                            { !this.props.product.isFetching && <ClientFilteredProductList /> }
                        </Paper>
                    </Grid>
                </Grid>
                <ProductViewDialog open={this.props.product.productViewOpen} handleRequestClose={this.props.hideProductView} />
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
        onLoad: () => dispatch(getProducts()),
        hideProductView: () => dispatch(actions.hideProductView()),
        hideSnackbar: () => dispatch(actions.hideSnackbar())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientProductPage);