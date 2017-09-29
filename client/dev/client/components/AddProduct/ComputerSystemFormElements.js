import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

import DesktopFormElements from '/DesktopFormElements';
import LaptopFormElements from '/LaptopFormElements';
import TabletFormElements from '/TabletFormElements';

export class ComputerSystemFormElements extends Component {

    render(){
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
                    <MenuItem value="desktop" primaryText="Desktop"/>
                    <MenuItem value="laptop" primaryText="Laptop"/>
                    <MenuItem value="tablet" primaryText="Tablet"/>
                </SelectField>
                if (props.computerType.equals('televisionSet')){
                <DesktopFormElements />
            }else if (props.computerType.equals('computerSystem')){
                <LaptopFormElements />
            }else if (props.computerType.equals('monitor')){
                <TabletFormElements />
            }else{
                <p />
            }
            </div>
        );
    }
}
