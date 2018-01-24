import React, { Fragment, Component } from 'react';
import AuthorizeConstants from '../../constants/AuthorizeConstants';
import './App.css';

import Authorize from '../Authorize';
import Filter from '../Filter';
import Playlists from '../Playlists';
import Player from '../Player';

import getHashParams from '../../utils/getHashParams'

class App extends Component {

    state = { logged: false, token: null }

    componentDidMount() {
        const { access_token, state } = getHashParams();
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
                <h1 className="App-title">Spotifood</h1>
            </header>
            {this.state.logged ? (
                <Fragment>
                    <Filter/>
                    <Playlists token={this.state.token}/>
                    <Player />
                </Fragment>
            ) : <Authorize/>}
        </div>
        );
    }
}

export default App;
