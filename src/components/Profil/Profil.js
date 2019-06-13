import React from 'react';
import { Button, FormGroup, FormLabel,FormControl } from "react-bootstrap";
import API from '../../utils/API';
import '../../assets/css/index.css';
import classNames from 'classnames';


import logo from "../../assets/images/animationFin.png";
export class Profil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            sex:"",
        }
        this.handleChange.bind(this);
        //this.send.bind(this);

        //localStorage.setItem('text', " ");
    };

    send = event => {
        if (this.state.email.length === 0) {
            localStorage.setItem('text', "email invalid"); this.setState({
                ...this.state
            });
            //window.location = "/"
            return;
        }
        if (this.state.password.length === 0) {
            localStorage.setItem('text', "pass invalid");this.setState({
                ...this.state
            });
            //window.location = "/"
            return;
        }
        API.Profil(this.state.email, this.state.password, this.state.Age, this.state.Nom, this.state.Sex, this.state.Prénom).then(function (data) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', data.data.user);
            localStorage.setItem('user', data.data.user.Nom);
            localStorage.setItem('user', data.data.user.Prénom);
            localStorage.setItem('user', data.data.user.Sex);
            localStorage.setItem('user', data.data.user.Age);
            window.location = "/dashboard"
        }, function (error ) {

            });

        localStorage.setItem('text', "pass ou user invalid");
        this.setState({
            ...this.state
        });
            ///console.log(error);
         //  window.location = "/";
            return  ;

    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="ProfilBack">

            <div className="Profil">
            <FormLabel className="titleProfil"> Profil</FormLabel>


            <FormGroup controlId = "Sex" bsSize="large">
                    <FormLabel>Sex</FormLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormControl id = "sex" type="text" value={this.state.sex} onChange={this.handleChange}/>
                 </FormGroup>

                <FormGroup controlId="email" bsSize="large" >
                    <FormLabel>Email</FormLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>&nbsp;
                    <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                </FormGroup>

                <div className="erreur">{localStorage.getItem('text' )}</div>
                <Button
                    onClick={this.send}
                    block
                    bsSize="large"
                    type="submit"
                >
                    Mise à jour
                </Button>
            </div> </div>)
    }
}