import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid';

import { setProductFilter, getProducts, setPage } from '../../actions/productView';

const eTypes = [
    'Monitor',
    'Desktop',
    'Laptop',
    'Tablet'
];

const brands = [
    "Acer",
    "Apple",
    "Asus",
    "Dell",
    "HP",
    "Lenovo",
    "LG",
    "Samsung"
];

class ProductTypeDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brand: this.props.product.filters.brand,
            electronicType: this.props.product.filters.electronicType,
            priceLow: this.props.product.filters.priceLow,
            priceHigh: this.props.product.filters.priceHigh,
            maxSize: this.props.product.filters.maxSize,
            maxWeight: this.props.product.filters.maxWeight,
            anchorEl: null,
            open: false,
        }
        this.syncStateToInputValue = this.syncStateToInputValue.bind(this);

    }

    handleClick = (field, event) => {
        if(field === "type"){
            this.setState({ openType: true, anchorEl: event.currentTarget });
        }else{
            this.setState({ openBrand: true, anchorEl: event.currentTarget });
        }

    };

    handleRequestClose = () => {
        this.setState({ openType: false, openBrand: false });
    };

    syncStateToInputValue = (field, val) => {
        this.props.setPage(1);
        let filter;
        this.setState({...this.state, [field]: val}, () => {
            filter = {
                brand: this.state.brand,
                electronicType: this.state.electronicType,
                priceLow: this.state.priceLow,
                priceHigh: this.state.priceHigh,
                maxSize: this.state.maxSize,
                maxWeight: this.state.maxWeight
            };
            this.props.setProductFilter(filter);
            this.props.getProducts();
        });
        this.handleRequestClose();
    };

    render() {
        return (
            <div>
                <Grid container spacing={24} justify='center'>
                    <Grid item xs={2}>
                        <div>
                            <Button
                                raised
                                aria-owns={this.state.openType ? 'type-select' : null}
                                aria-haspopup="true"
                                onClick={(event) => this.handleClick('type', event)}
                            >
                                Type
                            </Button>
                            <Menu
                                id="type-select"
                                anchorEl={this.state.anchorEl}
                                open={this.state.openType}
                                onRequestClose={this.handleRequestClose}
                                onChange={(event) => this.syncStateToInputValue("electronicType", event)}
                            >
                                <MenuItem onClick={(event) => this.syncStateToInputValue("electronicType", "")}>All</MenuItem>
                                {eTypes.map((type) => (
                                    <MenuItem onClick={(event) => this.syncStateToInputValue("electronicType", type)}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <Button
                                raised
                                aria-owns={this.state.openBrand ? 'brand-select' : null}
                                aria-haspopup="true"
                                onClick={(event) => this.handleClick('brand', event)}
                            >
                                Brand
                            </Button>
                            <Menu
                                id="brand-select"
                                anchorEl={this.state.anchorEl}
                                open={this.state.openBrand}
                                onRequestClose={this.handleRequestClose}
                                onChange={(event) => this.syncStateToInputValue("brand", event)}
                            >
                                <MenuItem onClick={(event) => this.syncStateToInputValue("brand", "")}>All</MenuItem>
                                {brands.map((brand) => (
                                    <MenuItem onClick={(event) => this.syncStateToInputValue("brand", brand)}>
                                        {brand}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="priceLow"
                            name="priceLow"
                            label="Min Price"
                            onChange={(event) => this.syncStateToInputValue("priceLow", event.target.value)}
                            value={this.state.priceLow}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="priceHigh"
                            name="priceHigh"
                            label="Max Price"
                            onChange={(event) => this.syncStateToInputValue("priceHigh", event.target.value)}
                            value={this.state.priceHigh}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="maxWeight"
                            name="maxWeight"
                            label="Max Weight"
                            onChange={(event) => this.syncStateToInputValue("maxWeight", event.target.value)}
                            value={this.state.maxWeight}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="maxSize"
                            name="maxSize"
                            label="Max Size"
                            onChange={(event) => this.syncStateToInputValue("maxSize", event.target.value)}
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