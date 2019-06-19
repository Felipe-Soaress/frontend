import React, {Component} from 'react';
import api from '../../services/api';
import sha256 from 'crypto-js/sha256';

import cookie from '../../utils/cookie';

import './styles.css';
// import { Container } from './styles';

const CryptoJS = require('crypto-js');

export default class Login extends Component {
    state = {
        newUser: '',
        newPassword: '',
    };



    handleSubmit = async e => {
        e.preventDefault();

        var username = document.getElementById("username");
        var password = document.getElementById("password");

        var hashName = CryptoJS.SHA256(username.value);
        var hashPassword = CryptoJS.SHA256(password.value);

        var result = hashName.toString(CryptoJS.enc.Hex);
        var result2 = hashPassword.toString(CryptoJS.enc.Hex);

        // const newUser = this.props.match.params.id;
        
        const response = await api.get(`login/`, (result));

        this.setState({
            newUser: response.data
        });
        console.log(response);
        this.props.history.push(`/user/${response.data._id}`);
    };

    handleInputChange = (e) => {
        this.setState({
            newUser: e.target.value
        });
    }

    handleInputChangePassword = (e) => {
        this.setState({
            newPassword: e.target.value
        })
    }


    render() {
        return ( 
        <div id = "main-container" >
            <form onSubmit = {this.handleSubmit}>
                <img src = "" alt = "" / >
                <input id = "username"
                    placeholder = "Usuário"
                    value = {this.state.newUser}
                    onChange = {this.handleInputChange}
                /> 
            <input id = "password"
            placeholder = "Senha"
            type = "password"
            value = {
                this.state.newPassword
            }
            onChange = {
                this.handleInputChangePassword
            }
            /> 
            <button type = "submit" > Login </button> 
            </form > 
            </div>
        );

    }
}