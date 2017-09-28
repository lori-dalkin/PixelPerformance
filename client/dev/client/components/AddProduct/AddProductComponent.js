import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Topography from 'material-ui/Topography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

export class AddProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            weight: '',
            modelNumber: '',
            brand: '',
            price: '',
            category: ''
        }
    }

    updateState(e) {
        this.setState({[e.target.name]: e.target.value,});
    }

    addProduct(e) {
        // Add product function.
    }

    change(e){
        category = document.querySelector('#electronicsCategory').value;
        if (category.equals('televisonSet')){
            // Smthg
        }else if (category.equals('computerSystem')){
            // Smthg
        }else if (category.equals('monitor')){
            // Smthg
        }
    }

    render(){
        return(
            <div>
                <Grid container spacing={24} justify="center">
                    <Grid item xs={10} md={5} lg={4}>
                        <Paper style={panelPadding}>
                            <Topography content="h3">
                                Add Product Form
                            </Topography>
                            <br />
                            <form onSubmit{this.addProduct}>
                                <TextField
                                    id="id"
                                    label="ProductID"
                                    onChange={this.updateState}
                                />
                                <TextField
                                    id="weight"
                                    label="Weight"
                                />
                                <TextField
                                    id="modelNumber"
                                    label="Model Number"
                                    onChange={this.updateState}
                                />
                                <TextField
                                    id="brand"
                                    label="Brand"
                                    onChange={this.updateState}
                                />
                                <TextField
                                    id="price"
                                    label="Price"
                                    onChange={this.updateState}
                                />
                                <SelectField id="electronicsCategory" onChange={this.updateState}>
                                    <MenuItem value="televisionSet" onChange={this.change} primaryText="Television Set"/>
                                    <MenuItem value="computerSystem" onChange={this.change} primaryText="Computer System"/>
                                    <MenuItem value="monitor" onChange={this.change} primaryText="Monitor"/>
                                </SelectField>

                                <Button type="submit">Submit</Button>
                                <Button type="button" onClick={reset}>Clear</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}