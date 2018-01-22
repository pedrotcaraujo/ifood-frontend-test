import React, { Component } from 'react';
import buildURL from 'build-url';

const URL = 'https://accounts.spotify.com/authorize';

const STATE_KEY = 'spotify_auth_state'
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
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    
    send = () => {
        const state = this.generateRandomString(16)
        window.localStorage.setItem(STATE_KEY, state);
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
            <button onClick={this.send}>Acessar com Spotify</button>
        )
    }
}

export default Authorize;