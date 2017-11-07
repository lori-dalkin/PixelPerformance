import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';

import { setProductFilter, getProducts, setPage } from '../../actions/productView'

class ClientProductTypeNav extends Component {
    constructor(props) {
    super(props);

    this.state = {
    filterType: "none",
    };

    this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (field, event) => {
        this.setState({[field]: event},()=>{
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
            <div style={{ marginRight: '20px'}}>
                <Button color="contrast" onClick={(event) => this.handleChange("filterType", "Monitor")}>Monitor</Button>
                <Button color="contrast" onClick={(event) => this.handleChange("filterType", "Desktop")}>Desktop</Button>
                <Button color="contrast" onClick={(event) => this.handleChange("filterType", "Laptop")}>Laptop</Button>
                <Button color="contrast" onClick={(event) => this.handleChange("filterType", "Tablet")}>Tablet</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientProductTypeNav);