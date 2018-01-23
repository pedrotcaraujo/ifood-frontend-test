import React, { Component } from 'react';
import buildURL from 'build-url';
import AuthorizeConstants from '../../constants/AuthorizeConstants';
import './Authorize.css'

const URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = 'c421219fc6f34ffb9c55cfa5ede32a6d';
const REDIRECT_URI = 'http://localhost:3000';

class Authorize extends Component {

    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    generateRandomString(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    
    send = () => {
        const state = this.generateRandomString(16)
        window.localStorage.setItem(AuthorizeConstants.STATE_KEY, state);
        window.location = buildURL(URL, {
            queryParams: {
                client_id: CLIENT_ID,
                response_type: 'token',
                redirect_uri: REDIRECT_URI,
                state
            }
        });
    }
    render() {
        return (
            <div className="Authorize">
                <img alt="" src="https://open.scdn.co/static/images/logo-white-2x.png"/>
                <button className="Authorize-button" onClick={this.send}>Acessar com Spotify</button>
            </div>
        )
    }
}

export default Authorize;