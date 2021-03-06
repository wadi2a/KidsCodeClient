import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from '../../utils/API';
import '../../assets/css/index.css';
export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            cpassword: ""
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    send = event => {
        if (this.state.email.length === 0) {
            return;
        }
        if (this.state.password.length === 0 || this.state.password !== this.state.cpassword) {
            return;
        }
        var _send = {
            email: this.state.email,
            password: this.state.password
        }
        API.signup(_send).then(function (data) {
            localStorage.setItem('token', data.data.token);
            window.location = "/dashboard"
        }, function (error) {
            console.log(error);
            return;
        })
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return ( <div className="LoginBack">
            <div className="Login">
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <FormGroup controlId="cpassword" bsSize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl value={this.state.cpassword} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <Button
                    onClick={this.send}
                    block
                    bsSize="large"
                    type="submit"
                >
                    Inscription
                </Button>
            </div>
            </div>
        )
    }
}
