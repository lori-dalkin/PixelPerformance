import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export class TabletFormElements extends Component {
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
                    id="dimension"
                    name="dimensions"
                    label="Dimensions"
                    value={this.state.value}
                    onChange={this.updateState}
                />
            </div>
        );
    }
}
