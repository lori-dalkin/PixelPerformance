import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import { setProductFilter, getProducts, setPage } from '../../actions/productView'

class ProductTypeDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = this.props.product.filters;

        this.syncStateToInputValue = this.syncStateToInputValue.bind(this);

    }

    syncStateToInputValue = (field, event) => {
        this.props.setPage(1);
        let filter;
        this.setState({...this.state, [field]: event.target.value}, () => {
            filter = this.state;
            this.props.setProductFilter(filter);
            this.props.getProducts();
        });
    };

    getBrandList = () => {
        const brandList = [];
        this.props.product.products.map(product => {
            if (brandList.indexOf(product.brand) === -1) {
                brandList.push(product.brand)
            }
        });
        return brandList;
    };

    render() {
        return (
            <div>
                <Grid container spacing={24} justify='center'>
                    <Grid item xs={2}>
                        <Select name="electronicType"
                                value={this.state.electronicType}
                                onChange={(event) => this.syncStateToInputValue("electronicType", event)}
                                style={{paddingLeft: '20px'}}
                        >
                            <MenuItem value="none">Type</MenuItem>
                            <MenuItem value="Monitor">Monitor</MenuItem>
                            <MenuItem value="Desktop">Desktop</MenuItem>
                            <MenuItem value="Laptop">Laptop</MenuItem>
                            <MenuItem value="Tablet">Tablet</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={2}>
                        <Select name="filterBrand"
                                value={this.state.brand}
                                onChange={(event) => this.syncStateToInputValue("brand", event)}
                                style={{paddingLeft: '20px'}}
                        >
                            <MenuItem value="none">Brand</MenuItem>
                            { this.props.product.products.length > 0 && this.getBrandList().map((brand) => (
                                <MenuItem value={brand}
                                          onClick={(event) => this.syncStateToInputValue("brand", brand)}>
                                    {brand}
                                </ MenuItem >
                            ))
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="priceLow"
                            name="priceLow"
                            label="Min Price"
                            onChange={(event) => this.syncStateToInputValue("priceLow", event)}
                            value={this.state.priceLow}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="priceHigh"
                            name="priceHigh"
                            label="Max Price"
                            onChange={(event) => this.syncStateToInputValue("priceHigh", event)}
                            value={this.state.priceHigh}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="maxWeight"
                            name="maxWeight"
                            label="Max Weight"
                            onChange={(event) => this.syncStateToInputValue("maxWeight", event)}
                            value={this.state.maxWeight}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="maxSize"
                            name="maxSize"
                            label="Max Size"
                            onChange={(event) => this.syncStateToInputValue("maxSize", event)}
                            value={this.state.maxSize}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = ({product}) => ({
    product
});

const mapDispatchToProps = (dispatch) => {
    return {
        setProductFilter: (filter) => {
            dispatch(setProductFilter(filter));
        },
        getProducts: () => {
            dispatch(getProducts());
        },
        setPage: (number) => {
            dispatch(setPage(number));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeDropdown);