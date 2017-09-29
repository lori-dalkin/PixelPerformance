import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button'; 
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Slide from 'material-ui/transitions/Slide';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

import { addProduct } from '../../actions';

const fullWidthStyle = {
  width: '100%'
};

const clearGridContainerWidth = {
  margin: '0px -12px -12px 0px'
};

class ProductAddDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
        weight: '',
        modelNumber: '',
        brand: '',
        price: '',
        electronicType: 'TelevisionSet',
        processor: '',
        ram: '',
        hardDrive: '',
        cpus: '',
        os: '',
        dimensions: '',
        type: '',
        computerType: 'Desktop',
        displaySize: '',
        battery: '',
        camera: '',
        touchscreen: '',
        size: ''
    };

    this.syncStateToInputValue = (field, event) => {
      this.setState({...this.state, [field]: event.target.value});
    }
  }

	render() {
		return (
				<Dialog style={{ maxHeight: '150vh' }} open={this.props.open} transition={Slide} onRequestClose={this.props.handleRequestClose}>
          <DialogTitle>{"Add Product"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={24} justify='center'>
              <Grid item xs={4}>
                <TextField
                  id="weight"
                  name="weight"
                  label="Weight"
                  onChange={(event) => this.syncStateToInputValue("weight", event)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="modelNumber"
                  name="modelNumber"
                  label="Model Number"
                  onChange={(event) => this.syncStateToInputValue("modelNumber", event)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="brand"
                  name="brand"
                  label="Brand"
                  onChange={(event) => this.syncStateToInputValue("brand", event)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={24} justify='center'>
              <Grid item xs={6}>
                <TextField
                  style={fullWidthStyle}
                  id="price"
                  name="price"
                  label="Price"
                  onChange={(event) => this.syncStateToInputValue("price", event)}
                />
              </Grid>
              <Grid item xs={6}>
                <Select style={{ marginTop: '16px', ...fullWidthStyle }} name="electronicType" 
                        value={this.state.electronicType} onChange={(event) => this.syncStateToInputValue("electronicType", event)}>
                  <MenuItem value="TelevisionSet">TelevisionSet</MenuItem>
                  <MenuItem value="ComputerSystem">ComputerSystem</MenuItem>
                    <MenuItem value="Monitor">Monitor</MenuItem>
                </Select>
              </Grid>
            </Grid>
            {(() => {
              switch (this.state.electronicType) {
                case "TelevisionSet":
                  return (
                    <Grid container spacing={24} justify='center'>
                      <Grid item xs={6}>
                        <TextField
                          style={fullWidthStyle}
                          id="dimensions"
                          name="dimensions"
                          label="Dimensions"
                          onChange={(event) => this.syncStateToInputValue("dimensions", event)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          style={fullWidthStyle}
                          id="type"
                          name="type"
                          label="Type"
                          onChange={(event) => this.syncStateToInputValue("type", event)}
                        />
                      </Grid>
                    </Grid>
                  );
                case "ComputerSystem":
                  return (
                    <Grid container spacing={24} justify='center'>
                      <Grid item xs={4}>
                        <TextField
                          style={fullWidthStyle}
                          id="processor"
                          name="processor"
                          label="Processor"
                          onChange={(event) => this.syncStateToInputValue("processor", event)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          style={fullWidthStyle}
                          id="ram"
                          name="ram"
                          label="RAM"
                          onChange={(event) => this.syncStateToInputValue("ram", event)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          style={fullWidthStyle}
                          id="hardDrive"
                          name="hardDrive"
                          label="Harddrive"
                          onChange={(event) => this.syncStateToInputValue("hardDrive", event)}
                        />
                      </Grid> 
                      <Grid item xs={4}>
                        <TextField
                          style={fullWidthStyle}
                          id="cpu"
                          name="cpu"
                          label="CPU"
                          onChange={(event) => this.syncStateToInputValue("cpu", event)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          style={fullWidthStyle}
                          id="os"
                          name="os"
                          label="OS"
                          onChange={(event) => this.syncStateToInputValue("os", event)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Select style={{ marginTop: '16px', ...fullWidthStyle }} value={this.state.computerType} 
                                name="computerType" onChange={(event) => this.syncStateToInputValue("computerType", event)}>
                          <MenuItem value="Desktop">Desktop</MenuItem>
                          <MenuItem value="Laptop">Laptop</MenuItem>
                          <MenuItem value="Tablet">Tablet</MenuItem>
                        </Select>
                      </Grid>
                      {(() => {
                        switch (this.state.computerType) {
                          case "Desktop":
                            return (
                              <Grid style={clearGridContainerWidth} container spacing={24} justify='flex-start'>
                                <Grid item xs={4}>
                                  <TextField
                                    style={fullWidthStyle}
                                    id="dimensions"
                                    name="dimensions"
                                    label="Dimensions"
                                    onChange={(event) => this.syncStateToInputValue("dimensions", event)}
                                  />
                                </Grid>
                              </Grid>
                            );
                          case "Laptop":
                            return (
                              <Grid style={clearGridContainerWidth} container spacing={24} justify='center'>
                                <Grid item xs={6}>
                                  <TextField
                                    style={fullWidthStyle}
                                    id="displaySize"
                                    name="displaySize"
                                    label="Display Size"
                                    onChange={(event) => this.syncStateToInputValue("displaySize", event)}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    style={fullWidthStyle}
                                    id="battery"
                                    name="battery"
                                    label="Battery"
                                    onChange={(event) => this.syncStateToInputValue("battery", event)}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    style={fullWidthStyle}
                                    id="camera"
                                    name="camera"
                                    label="Camera"
                                    onChange={(event) => this.syncStateToInputValue("camera", event)}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    style={fullWidthStyle}
                                    id="touchScreen"
                                    name="touchScreen"
                                    label="Touch Screen"
                                    onChange={(event) => this.syncStateToInputValue("touchScreen", event)}
                                  />
                                </Grid>
                              </Grid>
                            );
                          case "Tablet":
                            return (
                              <Grid style={clearGridContainerWidth} container spacing={24} justify='center'>
                                <Grid item xs={6}>
                                  <TextField
                                    style={fullWidthStyle}
                                    id="displaySize"
                                    name="displaySize"
                                    label="Display Size"
                                    onChange={(event) => this.syncStateToInputValue("displaySize", event)}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    style={fullWidthStyle}
                                    id="battery"
                                    name="battery"
                                    label="Battery"
                                    onChange={(event) => this.syncStateToInputValue("battery", event)}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    style={fullWidthStyle}
                                    id="camera"
                                    name="camera"
                                    label="Camera"
                                    onChange={(event) => this.syncStateToInputValue("camera", event)}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    style={fullWidthStyle}
                                    id="dimension"
                                    name="dimensions"
                                    label="Dimensions"
                                    onChange={(event) => this.syncStateToInputValue("dimension", event)}
                                  />
                                </Grid>
                              </Grid>
                            );
                          default:
                            return <p />;
                        }
                      })()}
                    </Grid>
                  );
                case "Monitor":
                  return (
                    <Grid container spacing={24} justify='flex-start'>
                      <Grid item xs={4}>
                        <TextField
                          style={fullWidthStyle}
                          id="size"
                          name="size"
                          label="Size"
                          onChange={(event) => this.syncStateToInputValue("size", event)}
                        />
                      </Grid>
                    </Grid>
                  );
                default:
                  return <p />;
              }
            })()}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.props.addProduct(this.state)} color="primary">
              Add
            </Button>
            {this.props.product.addProduct.addingProduct && <CircularProgress color="accent" style={{ width: '30px'}} />}
          </DialogActions>
        </Dialog>
		  )
	}

};

const mapStateToProps = ({product}) => ({
  product
});

const mapDispatchToProps = {
  addProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddDialog);