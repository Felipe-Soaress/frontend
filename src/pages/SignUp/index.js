import React, {
    Component
} from 'react';
import api from '../../services/api';
import {decryptRsaPrivateKey,decryptRsaPublicKey,encryptRsaPrivateKey,encryptRsaPublicKey} from '../../utils/criptografia';
import './styles.css';
import logo from '../../assets/box.gif'
import ls from 'local-storage'

// import { Container } from './styles';
const CryptoJS = require('crypto-js');

export default class SignUp extends Component {
    state = {
        newUser: '',
        newPassword: '',
        newEmail: ''
    };

    

    handleSubmit = async e => {
        e.preventDefault();

        const res = await api.get('/handshake');
        const key = res.data.publicKey;
        const data = [{
            username: document.getElementById("username").value,
            password: CryptoJS.SHA256(document.getElementById("password").value).toString(CryptoJS.enc.Base64),
            email: document.getElementById("email").value
        }];
        const verifica = await api.get(`users/?username=${document.getElementById("username").value}`);
        if(verifica.data.login){
                const privateKey = CryptoJS.SHA256(data[0].username + data[0].password).toString(CryptoJS.enc.Base64);
                ls.set('keyPrivate', privateKey);
            data[0].privateKey = privateKey;
            var keyClient = encryptRsaPublicKey(privateKey, key);
            const resp = await api.post('/handshake', {data: keyClient});
            if(resp){
                var hashEmail = CryptoJS.SHA256(document.getElementById("email").value).toString(CryptoJS.enc.Base64);
                var emailPassConcat = hashEmail + data[0].password;
                data[0].password = CryptoJS.SHA256(emailPassConcat).toString(CryptoJS.enc.Base64);
                const dataCiphered = CryptoJS.AES.encrypt(JSON.stringify(data), privateKey);
                const response = await api.post('users', {data: dataCiphered.toString()});
                this.props.history.push(`/`);
            }else{
                console.log("errooooo");
            }
        }else{
            alert("Username já existe");
            return;
        }
        
        
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

    handleInputChangeEmail = (e) => {
        this.setState({
            newEmail: e.target.value
        })
    }

    render() {
    return (
        <div id="main-container">
            <div id = "divLogo">
                    <img src = {logo} alt = "" / >
                    <text id = "logo">SaveBox</text>
                </div>
            <form onSubmit={this.handleSubmit}>
                <input id="username"
                    placeholder="Usuário" 
                    value={this.state.newUser}
                    onChange={this.handleInputChange}
                />
                <input id="password"
                    placeholder="Senha"
                    type="password"
                    value={this.state.newPassword}
                    onChange = {this.handleInputChangePassword}
                /> 
                <input id="email"
                    placeholder="E-mail"
                    type="email"
                    value={this.state.newEmail}
                    onChange={this.handleInputChangeEmail}
                /> 
                
                <button type="submit">Criar</button>
            </form>
        </div>
    );

  }
  
}