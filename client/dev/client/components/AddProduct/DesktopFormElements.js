import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export class DesktopFormElements extends Component {
    render(){
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
    }
}
