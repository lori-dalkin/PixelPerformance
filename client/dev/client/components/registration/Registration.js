import React, {Component} from 'react';
import {connect} from 'react-redux';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import { attemptRegistration, hideSnackbar } from '../../actions/index';

const formStyle = {
    display: 'flex',
    flexWrap: 'wrap'
};

class Registration extends Component {

    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            address: "",
            phone: ""
        };
        this.register = () => {
            this.props.attemptRegistration({
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                phone: this.state.phone
            });
        };
        this.syncStateToInputValue = (field, event) => {
            this.setState({...this.state, [field]: event.target.value});
        }
    }

    render() {
        return (
            <Dialog open={this.props.open} onRequestClose={this.props.handleRequestClose}>
                <DialogTitle>Registration Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form style={formStyle} noValidate autoComplete="off">
                            <Grid container spacing={24} justify='center'>
                                <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="fname"
                                    label="First Name"
                                    fullWidth
                                    margin="normal"
                                    onChange={(event) => this.syncStateToInputValue("fname", event)}
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="lname"
                                    label="Last Name"
                                    fullWidth
                                    margin="normal"
                                    onChange={(event) => this.syncStateToInputValue("lname", event)}
                                />
                                </Grid>
                        </Grid>
                        <Grid container spacing={24} justify='center'>
                                <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="email"
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    onChange={(event) => this.syncStateToInputValue("email", event)}
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="password"
                                    type="password"
                                    label="Password"
                                    fullWidth
                                    margin="normal"
                                    onChange={(event) => this.syncStateToInputValue("password", event)}
                                />
                                </Grid>
                        </Grid>
                        <Grid container spacing={24} justify='center'>
                                <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="address"
                                    label="Address"
                                    fullWidth
                                    margin="normal"
                                    onChange={(event) => this.syncStateToInputValue("address", event)}
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="phone"
                                    label="Phone Number"
                                    fullWidth
                                    margin="normal"
                                    onChange={(event) => this.syncStateToInputValue("phone", event)}
                                />
                                </Grid>
                            </Grid>
                </form><br /><br />

                        <Button
                            raised color="accent"
                            onClick={this.register}
                        >
                            Register
                        </Button>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.handleRequestClose} color="primary">
                    Back
                </Button>
            </DialogActions>
        </Dialog>
        );
    }
}

const mapStateToProps = ({ registration, snackbar }) => ({
    registration,
    snackbar
});

const mapDispatchToProps = {
    attemptRegistration,
    hideSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);