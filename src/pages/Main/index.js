import React, { Component } from 'react';
import api from '../../services/api';
import ls from 'local-storage'


import './styles.css';
// import { Container } from './styles';
var userId;
var userKey;
const CryptoJS = require('crypto-js');
export default class Main extends Component {
  state = {
    newBox: ''
  };  


  async componentDidMount() {
    userId = this.props.match.params.boxx;
    userKey = ls.get('keyPrivate')
    console.log(userKey);
  }
  handleSubmit = async e =>{
    e.preventDefault();

    var boxNew = [{title: this.state.newBox,user: userId}];
    boxNew = CryptoJS.AES.encrypt(JSON.stringify(boxNew), userKey);
    const response = await api.post('boxes', {
      boxNew: boxNew.toString(), user:userId
    });
    console.log(response);
    this.props.history.push(`/files/${response.data._id}`);
  };

  handleInputChange = (e) => {
    this.setState({ newBox: e.target.value });
  }

  render() {
    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
                <img src="" alt=""/>
                <input
                    placeholder="Criar um box" 
                    value={this.state.newBox}
                    onChange={this.handleInputChange}
                    />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
    
  }
}
