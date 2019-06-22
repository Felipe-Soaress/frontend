import React, { Component } from 'react';
import api from '../../services/api';
import Dropzone from 'react-dropzone';

import './styles.css';
import { async } from 'q';

export default class User extends Component {
    state = { user: {} ,
            boxes: {}};

    async componentDidMount() {
        const box = this.props.match.params.id;
        const response = await api.get(`boxes/${box}`);
        const response2 = await api.get(`/usersAll`);
        const boxesAll = await api.get(`/boxesAll`);
        this.setState({boxes: boxesAll});
        console.log("state: ", this.state.boxes);
        

        // this.setState({ box: response.data });
    }

  render() {
    return (
    <div id="box-container">
        <header>
            <img src="" alt=""/>
            <h1>{this.state.user.username}</h1>
            <div id="boxesAll">
            </div>
        </header>


        <ul>
            {this.state.boxes.data && this.state.boxes.data.map(file => (
                <li key={file._id}>
                <a className="fileInfo" href={`/files/${file._id}`} target="_blank">
                    
                    <strong>{file.title}</strong>
                </a>

                {/* <span>
                há{" "}
                {distanceInWords(file.createdAt, new Date(), {
                    locale: pt
                }) }</span> */}
            </li>
            )) }

            
            
        </ul>

        <div className="lista">
        </div>
    </div>
    
    );
  }
}
