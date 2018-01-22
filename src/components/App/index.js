import React, { Component } from 'react';
import './App.css';

import Authorize from '../Authorize';
import FeaturedPlaylist from '../FeaturedPlaylist';

const STATE_KEY = 'spotify_auth_state'

class App extends Component {

    state = { logged: false, token: null }

    componentDidMount() {
        const { access_token, state } = this.getHashParams();
        const storedState = window.localStorage.getItem(STATE_KEY);

        if (access_token && (state == null || state !== storedState)) {
            console.log('There was an error during the authentication');
        } else {
            window.localStorage.removeItem(STATE_KEY);    
            if (access_token) {
                this.setState({ logged: true, token: access_token })
            }
        }
    }

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
    getHashParams() {
        const hashParams = {};
        window.location.hash.substring(1).split('&').forEach(p => {
            const param = p.split('=');
            hashParams[param[0]] = decodeURIComponent(param[1]);
        })
        return hashParams;
    }

    onFeaturePlaylistError = () => {
        this.setState({
            logged: false,
            token: null
        })
    }

    render() {
        return (
        <div className="App">
            {this.state.logged ? <FeaturedPlaylist token={this.state.token} onError={this.onFeaturePlaylistError}/> : <Authorize/>}
        </div>
        );
    }
}

export default App;
