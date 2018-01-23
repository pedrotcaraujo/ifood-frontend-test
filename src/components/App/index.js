import React, { Fragment, Component } from 'react';
import AuthorizeConstants from '../../constants/AuthorizeConstants';
import './App.css';

import Authorize from '../Authorize';
import Filter from '../Filter';
import Playlist from '../Playlist';

class App extends Component {

    state = { logged: false, token: null }

    componentDidMount() {
        const { access_token, state } = this.getHashParams();
        const storedState = window.localStorage.getItem(AuthorizeConstants.STATE_KEY);

        if (access_token && (state == null || state !== storedState)) {
            console.log('There was an error during the authentication');
        } else {
            window.localStorage.removeItem(AuthorizeConstants.STATE_KEY);    
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
            <header className="App-header">
                <h1 className="App-title">Spotify Featured Playlist</h1>
            </header>
            {this.state.logged ? (
                <Fragment>
                    <Filter/>
                    <Playlist token={this.state.token}/>
                </Fragment>
            ) : <Authorize/>}
        </div>
        );
    }
}

export default App;
