import React, { Component } from 'react';
import AuthorizeConstants from '../../constants/AuthorizeConstants';
import './App.css';

import Authorize from '../_containers/Authorize';
import FilterPlaylists from '../_containers/FilterPlaylists';
import FeaturedPlaylists from '../_containers/FeaturedPlaylists';

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

    render() {
        return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Spotifood</h1>
            </header>
            {this.state.logged ? (
                <div>
                    <FilterPlaylists/>
                    <FeaturedPlaylists token={this.state.token} />
                </div>
            ) : <Authorize/>}
        </div>
        );
    }
}

export default App;
