import React, { Component } from 'react';
import api from '../../services/api';
import Dropzone from 'react-dropzone';
import {MdFolder} from 'react-icons/md'
import ls from 'local-storage'


import './styles.css';
import { async } from 'q';
var userId = '';
const CryptoJS = require('crypto-js');
export default class User extends Component {
    state = {user: {}, 
        boxes: {}};

    async componentDidMount() {
        const box = this.props.match.params.id;
        var userKey = ls.get('keyPrivate');
        userId = box;
        const boxesAll = await api.get(`/boxesAll/${userId}`);
        var boxesDecript = {data:JSON.parse(CryptoJS.AES.decrypt(boxesAll.data.toString(), userKey).toString(CryptoJS.enc.Utf8))} ;
        this.setState({boxes: boxesDecript});
    }


  render() {
    return (
    <div id = "box-container">
        <header>
            <img src="" alt=""/>
            <h1>{this.state.user.username}</h1>
                <button>
                <a href={`/box/${userId}`} style={{color:"#FFF"}}>+ New Box</a>
                </button>
        </header>


        <ul>
            {this.state.boxes.data && this.state.boxes.data.map(file => (
                <li key={file._id}>
                <a className="fileInfo" href={`/files/${file._id}`} target="_blank">
                    <MdFolder size={24} color="#A5Cfff"/>
                    <strong>{file.title}</strong>
                </a>
            </li>
            )) }

            
            
        </ul>

        <div className="lista">
        </div>
    </div>
    
    );
  }
}
