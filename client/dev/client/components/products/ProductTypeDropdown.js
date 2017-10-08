import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

import { setProductFilter } from '../../actions'

class ProductTypeDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'none',
            anchorEl: null,
            open: false
        };
    }

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        this.props.setProductFilter(this.state.value);
    };

    render() {
        return (
            <div>
                <Button
                    raised
                    aria-owns={this.state.open ? 'dowpdown-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Select Filter
                </Button>
                <Menu
                    id="downdown-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    onChange={this.handleChange}
                >
                    <MenuItem value={'none'}>No Filter</MenuItem>
                    <MenuItem value={'televisionSet'}>TelevisionSet</MenuItem>
                    <MenuItem value={'monitor'}>Monitor</MenuItem>
                    <MenuItem value={'desktop'}>Desktop</MenuItem>
                    <MenuItem value={'laptop'}>Laptop</MenuItem>
                    <MenuItem value={'tablet'}>Tablet</MenuItem>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = ({product}) => ({
    product
});

const mapDispatchToProps = {
    setProductFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeDropdown);