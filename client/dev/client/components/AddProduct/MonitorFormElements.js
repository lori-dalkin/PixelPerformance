import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export class MonitorFormElements extends Component {
    render(){
        return (
            <div>
                <TextField
                    id="size"
                    name="size"
                    label="Size"
                    value={this.state.value}
                    onChange={this.updateState}
                />
            </div>
        );
    }
}

/**
 * Created by saman on 2017-09-28.
 */
