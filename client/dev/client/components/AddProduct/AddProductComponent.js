import React, {Component} from 'react';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import MonitorFormElements from '/MonitorFormElements';
import ComputerSystemFormElements from '/ComputerSystemFormElements';
import TelevisionSetFormElements from '/TelevisionSetFormElements';

export class AddProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            weight: '',
            modelNumber: '',
            brand: '',
            price: '',
            category: '',
            processor: '',
            ram: '',
            hardDrive: '',
            cpu: '',
            os: '',
            dimensions: '',
            type: '',
            computerType: '',
            displaySize: '',
            battery: '',
            camera: '',
            touchScreen: '',
            size: ''
        };
        this.updateState = this.updateState.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    updateState(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    addProduct(event) {
        // Add product function.
    }

    render(){
        const actions =[
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Add Product Model" onClick={this.handleOpen} />
                <Dialog
                    title="Add Product Form"
                    actions={actions}
                    model={true}
                    open={this.state.open}
                >
                    <form onSubmit={addProduct}>
                        <TextField
                            id="id"
                            name="id"
                            label="ProductID"
                            value={this.state.value}
                            onChange={this.updateState}
                        />
                        <TextField
                            id="weight"
                            name="weight"
                            label="Weight"
                            value={this.state.value}
                            onChange={this.updateState}
                        />
                        <TextField
                            id="modelNumber"
                            name="modelNumber"
                            label="Model Number"
                            value={this.state.value}
                            onChange={this.updateState}
                        />
                        <TextField
                            id="brand"
                            name="brand"
                            label="Brand"
                            value={this.state.value}
                            onChange={this.updateState}
                        />
                        <TextField
                            id="price"
                            name="price"
                            label="Price"
                            value={this.state.value}
                            onChange={this.updateState}
                        />
                        <SelectField name="category" value={this.state.value} onChange={this.updateState}>
                            <MenuItem value="televisionSet" primaryText="Television Set"/>
                            <MenuItem value="computerSystem" primaryText="Computer System"/>
                            <MenuItem value="monitor" primaryText="Monitor"/>
                        </SelectField>
                        <div>
                            if (this.state.category.equals('televisionSet')){
                                <TelevisionSetFormElements dimensions={this.state.dimensions} type={this.state.type} />
                            }else if (props.computerType.equals('computerSystem')){
                                <ComputerSystemFormElements props={this.state} />
                            }else if (props.computerType.equals('monitor')){
                                <MonitorFormElements props={this.state} />
                            }else{
                                <p />
                            }
                        </div>

                        <Button type="submit">Submit</Button>
                        <Button type="button" onClick={reset}>Clear</Button>
                    </form>
                </Dialog>
            </div>
        );
    }
}
