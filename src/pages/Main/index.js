import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';
// import { Container } from './styles';
var userId;
export default class Main extends Component {
  state = {
    newBox: '',
  };  


  async componentDidMount() {
    userId = this.props.match.params.boxx;
  }
  handleSubmit = async e =>{
    e.preventDefault();
    // console.log(this.state.newBox);
    console.log("userId", userId);
    const response = await api.post('boxes', {
      title: this.state.newBox,
      user: userId
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
