import React, {Component} from 'react';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { addProduct } from '../../actions/index';

export class AddProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: '',
            weight: '',
            modelNumber: '',
            brand: '',
            price: '',
            electronicType: '',
            processor: '',
            ram: '',
            hardDrive: '',
            cpus: '',
            os: '',
            dimensions: '',
            type: '',
            computerType: '',
            displaySize: '',
            battery: '',
            camera: '',
            touchscreen: '',
            size: ''
        };
        this.updateState = this.updateState.bind(this);
        this.add = this.add.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    updateState(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    add = (event) => {
        event.preventDefault();
        this.props.addProduct({
            id: this.state.id,
            weight: this.state.weight,
            modelNumber: this.state.modelNumber,
            brand: this.state.brand,
            price: this.state.price,
            electronicType: this.state.electronicType,
            processor: this.state.processor,
            ram: this.state.ram,
            hardDrive: this.state.hardDrive,
            cpus: this.state.cpus,
            os: this.state.os,
            dimensions: this.state.dimensions,
            type: this.state.type,
            displaySize: this.state.displaySize,
            battery: this.state.battery,
            camera: this.state.camera,
            touchscreen: this.state.touchscreen,
            size: this.state.size
        });
        this.handleClose(event);
    }

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

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
            />
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
                    <form onSubmit={this.add}>
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
                        <SelectField name="electronicType" value={this.state.value} onChange={this.updateState}>
                            <MenuItem value="TelevisionSet" primaryText="Television Set"/>
                            <MenuItem value="ComputerSystem" primaryText="Computer System"/>
                            <MenuItem value="Monitor" primaryText="Monitor"/>
                        </SelectField>
                        <div>
                            {(() => {
                                switch (this.state.electronicType) {
                                    case "televisionSet":
                                        return (
                                            <div>
                                                <TextField
                                                    id="dimensions"
                                                    name="dimensions"
                                                    label="Dimensions"
                                                    value={this.state.value}
                                                    onChange={this.updateState}
                                                />
                                                <TextField
                                                    id="type"
                                                    name="type"
                                                    label="Type"
                                                    value={this.state.value}
                                                    onChange={this.updateState}
                                                />
                                            </div>
                                        );
                                    case "computerSystem":
                                        return (
                                            <div>
                                                <TextField
                                                    id="processor"
                                                    name="processor"
                                                    label="Processor"
                                                    value={this.state.value}
                                                    onChange={this.updateState}
                                                />
                                                <TextField
                                                    id="ram"
                                                    name="ram"
                                                    label="RAM"
                                                    value={this.state.value}
                                                    onChange={this.updateState}
                                                />
                                                <TextField
                                                    id="hardDrive"
                                                    name="hardDrive"
                                                    label="Harddrive"
                                                    value={this.state.value}
                                                    onChange={this.updateState}
                                                />
                                                <TextField
                                                    id="cpu"
                                                    name="cpu"
                                                    label="CPU"
                                                    value={this.state.value}
                                                    onChange={this.updateState}
                                                />
                                                <TextField
                                                    id="os"
                                                    name="os"
                                                    label="OS"
                                                    value={this.state.value}
                                                    onChange={this.updateState}
                                                />
                                                <SelectField name="computerType" value={this.state.value} onChange={this.updateState}>
                                                    <MenuItem value="Desktop" primaryText="Desktop"/>
                                                    <MenuItem value="Laptop" primaryText="Laptop"/>
                                                    <MenuItem value="Tablet" primaryText="Tablet"/>
                                                </SelectField>
                                                <div>
                                                    {(() => {
                                                        switch (this.state.computerType) {
                                                            case "desktop":
                                                                this.setState({ electronicType: "Desktop"});
                                                                return (
                                                                    <div>
                                                                        <TextField
                                                                            id="dimensions"
                                                                            name="dimensions"
                                                                            label="Dimensions"
                                                                            value={this.state.value}
                                                                            onChange={this.updateState}
                                                                        />
                                                                    </div>
                                                                );
                                                            case "laptop":
                                                                this.setState({ electronicType: "Laptop"});
                                                                return (
                                                                    <div>
                                                                        <TextField
                                                                            id="displaySize"
                                                                            name="displaySize"
                                                                            label="Display Size"
                                                                            value={this.state.value}
                                                                            onChange={this.updateState}
                                                                        />
                                                                        <TextField
                                                                            id="battery"
                                                                            name="battery"
                                                                            label="Battery"
                                                                            value={this.state.value}
                                                                            onChange={this.updateState}
                                                                        />
                                                                        <TextField
                                                                            id="camera"
                                                                            name="camera"
                                                                            label="Camera"
                                                                            value={this.state.value}
                                                                            onChange={this.updateState}
                                                                        />
                                                                        <TextField
                                                                            id="touchScreen"
                                                                            name="touchScreen"
                                                                            label="Touch Screen"
                                                                            value={this.state.value}
                                                                            onChange={this.updateState}
                                                                        />
                                                                    </div>
                                                                );
                                                            case "tablet":
                                                                this.setState({ electronicType: "Tablet"});
                                                                return (
                                                                    <div>
                                                                        <TextField
                                                                            id="displaySize"
                                                                            name="displaySize"
                                                                            label="Display Size"
                                                                            value={this.state.value}
                                                                            onChange={this.updateState}
                                                                        />
                                                                        <TextField
                                                                            id="battery"
                                                                            name="battery"
                                                                            label="Battery"
                                                                            value={this.state.value}
                                                                            onChange={this.updateState}
                                                                        />
                                                                        <TextField
                                                                            id="camera"
                                                                            name="camera"
                                                                            label="Camera"
                                                                            value={this.state.value}
                                                                            onChange={this.updateState}
                                                                        />
                                                                        <TextField
                                                                            id="dimension"
                                                                            name="dimensions"
                                                                            label="Dimensions"
                                                                            value={this.state.value}
                                                                            onChange={this.updateState}
                                                                        />
                                                                    </div>
                                                                );
                                                            default:
                                                                return <p />;
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        );
                                    case "monitor":
                                        return (
                                            <TextField
                                                id="size"
                                                name="size"
                                                label="Size"
                                                value={this.state.value}
                                                onChange={this.updateState}
                                            />
                                        );
                                    default:
                                        return <p />;
                                }
                            })()}
                        </div>
                    </form>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ({ param }) => ({
    param
});

const mapDispatchToProps = {
    addProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductComponent);
