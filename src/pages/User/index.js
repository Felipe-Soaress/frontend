import React, {
    Component
} from 'react';
import api from '../../services/api';

import './styles.css';


export default class User extends Component {
    state = {
        newUser: '',
        newPassword: '',
    };

    render() {
        return ( 
        <div id = "main-container" >
            <form onSubmit = {this.handleSubmit}>
                <img src = "" alt = "" / >
                
            <button type = "submit" > Login </button> 
            </form > 
            </div>
        );

    }
}