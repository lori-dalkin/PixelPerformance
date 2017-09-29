import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export class TelevisionSetFormElements extends Component {
    render(){
        return (
            <div>
                <TextField
                    id="dimensions"
                    name="dimensions"
                    label="Dimensions"
                    value={this.props.value}
                    onChange={this.props.updateState}
                />
                <TextField
                    id="type"
                    name="type"
                    label="Type"
                    value={this.props.value}
                    onChange={this.props.updateState}
                />
            </div>
        );
    }
}