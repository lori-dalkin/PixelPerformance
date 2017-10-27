import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

import { setProductFilter, getProducts, setPage } from '../../actions'

class ProductTypeDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filterType: "none",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (field, event) => {
        this.setState({[field]: event.target.value},()=>{
            let filter = "";
            if(this.state.filterType !== "none"){
                filter = `${this.state.filterType}`;
            }
            this.props.setPage(1);
            this.props.setProductFilter(filter);
            this.props.getProducts();
        });
    };

    render() {
        return (
            <div>
                    <Select name="filterType" value={this.state.filterType} onChange={(event) => this.handleChange("filterType", event)}>
                        <MenuItem value="none">Select Filter</MenuItem>
                        <MenuItem value="Monitor">Monitor</MenuItem>
                        <MenuItem value="Desktop">Desktop</MenuItem>
                        <MenuItem value="Laptop">Laptop</MenuItem>
                        <MenuItem value="Tablet">Tablet</MenuItem>
                    </Select>
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
        getProducts: (filter) => {
            dispatch(getProducts(filter));
        },
        setPage: (number) => {
            dispatch(setPage(number));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeDropdown);