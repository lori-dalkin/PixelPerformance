import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export class LaptopFormElements extends Component {
    render(){
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
    }
}
