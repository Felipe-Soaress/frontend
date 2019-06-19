import React, {
    Component
} from 'react';
import api from '../../services/api';
import {decryptRsaPrivateKey,decryptRsaPublicKey,encryptRsaPrivateKey,encryptRsaPublicKey} from '../../utils/criptografia';
import './styles.css';
// import { Container } from './styles';
const CryptoJS = require('crypto-js');


const chavePr = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCvslv8UjnU9T3RG6WwJOTJ0EdSAFxMIT6N/eJ704Mh0CkksAD2
hdspEJ5Qq07b6DPQcpI5zK1DQqC50vZMnP/hTZlUGbNxoF5JXgZn13ziUq9eL1AC
ayLBOiywmogG/Icg78vOqmDvaURClMXjARsjHX4X9rWUTwhBguBzL12BMQIDAQAB
AoGAVHE6uJikZu+/WCMbjP8OXtiVjpnRwl0v/XqKQc00dynevF1C+Tj4TlJIZKkQ
66w8SvDlypXOqEb7jJQSAFxstgYPbwxtKYzcyX9yEbK3c/PvJbnBAQxZSvJU7AuG
gt7rtvM/vPslGRYnYgn0Jia+/A8dbcgdd75/lcOdu3f9l2ECQQDirxCQR+m7gIHn
0GezLFnIY5heegSkw0MAh2cWuqby0v0KZrZG85CFP8nuknVL1o7x9HADfVYzXv4Q
cQOQO5ilAkEAxms8/LcNP/TkDWsg/KB0KVNypdoMbQhjZCdOz3LQuOEJnsLmqDvn
okMd0lkTA5+/HW67ATBYBM/mQ3qLrhQUnQJBAIYGM6jam9r8U9IXafiJlFviZsgV
JIG14PuDEvRhTyvqiymHKOYyQ5RE7sNbXHaGWOW9PC0UAc9FrrlR2GWClvECQEod
hIphVfGt6AGbIpc62CkXopuQ91NC7t1aUXXrzUtBw/Yplz8AIWXa7CjGXPPdl+XG
ltO62yXxAnHyNHqxxYECQQDHoSy3g7RmEkyBih3PTFChoo8djRn6b2HRPQuOAucK
xfgxCerR3aTqfzw+BOmd2yvUm4OIJ1y50G1pLZQnXKWv
-----END RSA PRIVATE KEY-----`;
const chavePu = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvslv8UjnU9T3RG6WwJOTJ0EdS
AFxMIT6N/eJ704Mh0CkksAD2hdspEJ5Qq07b6DPQcpI5zK1DQqC50vZMnP/hTZlU
GbNxoF5JXgZn13ziUq9eL1ACayLBOiywmogG/Icg78vOqmDvaURClMXjARsjHX4X
9rWUTwhBguBzL12BMQIDAQAB
-----END PUBLIC KEY-----`;

export default class SignIn extends Component {
    state = {
        newUser: '',
        newPassword: '',
        newEmail: ''
    };

    

    handleSubmit = async e => {
        e.preventDefault();

        var username = document.getElementById("username");
        var password = document.getElementById("password");
        var email = document.getElementById("email");

        var hashPassword = CryptoJS.SHA256(email.value+password.value);
        var resultPassword = hashPassword.toString(CryptoJS.enc.Hex);      
        
        var usernameCripted = encryptRsaPrivateKey(username.value, chavePr);
        console.log("user: ",usernameCripted);


        const response = await api.post('users', {
            username: username.value,
            password: password.value,
            email: email.value,
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

    handleInputChangeEmail = (e) => {
        this.setState({
            newEmail: e.target.value
        })
    }

    render() {
    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
                <img src="" alt=""/>
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