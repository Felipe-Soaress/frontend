import React, {Component} from 'react';
import api from '../../services/api';
import logo from '../../assets/box.gif'
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
        const data = {
            username : document.getElementById("username").value,
            password : CryptoJS.SHA256(document.getElementById("password").value).toString(CryptoJS.enc.Base64)
        }
        const response = await api.get(`login/?username=${data.username}&password=${data.password}`);
        if(response.data.naoExiste){
            alert("usuário não existe");
            return;
        }
        if(response.data.Existe){
            alert("Senha inválida");
            return;
        }
        if(!response.data){
            alert("Credenciais inválidas");
            return;
        }
        this.setState({
            newUser: response.data
        });
        this.props.history.push(`/user/${response.data._id}`);
        // this.props.history.push(`/box`);
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
            <div id = "divLogo">
                    <img src = {logo} alt = "" / >
                    <text id = "logo">SaveBox</text>
            </div>
            <form onSubmit = {this.handleSubmit}>
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
            <a href="/signup">Register</a> 
            </form >
            
            </div>
        );

    }
}