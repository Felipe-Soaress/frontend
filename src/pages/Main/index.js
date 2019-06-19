import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';
// import { Container } from './styles';

export default class Main extends Component {
  state = {
    newBox: '',
  };  

  handleSubmit = async e =>{
    e.preventDefault();
    // console.log(this.state.newBox);
    const response = await api.post('boxes', {
      title: this.state.newBox
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
