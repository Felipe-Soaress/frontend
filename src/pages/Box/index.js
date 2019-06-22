import React, { Component } from 'react';
import api from '../../services/api';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

import {MdInsertDriveFile} from 'react-icons/md'

import './styles.css';
import { async } from 'q';
// import { Container } from './styles';

export default class Box extends Component {
    state = { box: {} };

    async componentDidMount() {
        this.subscribeToNewFiles();


        const box = this.props.match.params.id;
        const response = await api.get(`boxes/${box}`);
        const response2 = await api.get(`/usersAll`);
        const boxesAll = await api.get(`/boxesAll`);
        try{
            var obj = JSON.parse(boxesAll);
            document.getElementsById("boxesAll").innerHTML = obj.title + ", " + obj.createdAt;
        }catch(e){
            console.log(e);
            
        }
        console.log(response2);
        console.log(boxesAll);
        

        this.setState({ box: response.data });
    }

    subscribeToNewFiles = () =>{
        const box = this.props.match.params.id;
        // const io = socket('https://felipeseguranca.herokuapp.com');
        const io = socket('http://localhost:3333');

        io.emit('connectRoom', box);

        io.on('file', data => {
            this.setState({ box: {...this.state.box, files: [data,...this.state.box.files] } });
        })
    }

    handleUpload = files => {
        files.forEach(file => {
            const data = new FormData();
            const box = this.props.match.params.id;

            data.append('file',file);

            api.post(`boxes/${box}/files`, data);
        });
    }

    



  render() {
    return (
    <div id="box-container">
        <header>
            <img src="" alt=""/>
            <h1>{this.state.box.title}</h1>
            <div id="boxesAll">
                {/* <ul>
                    <li>
                
                    </li>
                </ul> */}
            </div>
        </header>

        <Dropzone onDropAccepted={this.handleUpload} > 
            {({ getRootProps, getInputProps}) => (
                <div className="upload" {...getRootProps()}>
                <input { ...getInputProps()}/>
                <p>Arraste arquivos ou clique aqui</p>
                </div>
            )}
        </Dropzone>

        <ul>
            {this.state.box.files && this.state.box.files.map(file => (
                <li key={file._id}>
                <a className="fileInfo" href={file.url} target="_blank">
                    <MdInsertDriveFile size={24} color="#A5Cfff"/>
                    <strong>{file.title}</strong>
                </a>

                <span>
                há{" "}
                {distanceInWords(file.createdAt, new Date(), {
                    locale: pt
                }) }</span>
            </li>
            )) }

            
            
        </ul>

        <div className="lista">
        </div>
    </div>
    
    );
  }
}
