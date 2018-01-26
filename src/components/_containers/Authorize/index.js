import React from 'react';
import buildURL from 'build-url';
import AuthorizeConstants from '../../../constants/AuthorizeConstants';
import './Authorize.css'

import randomString from '../../../utils/randomString';

const URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = 'c421219fc6f34ffb9c55cfa5ede32a6d';
const REDIRECT_URI = window.location.origin;

const _send = () => {
    const state = randomString(16)
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

const Authorize = () => (
    <div className="Authorize">
        <img width="230px" alt="Spotify logo" src="https://open.scdn.co/static/images/logo-white-2x.png"/>
        <button className="Authorize-button" onClick={_send}>Acessar com Spotify</button>
    </div>
);

export default Authorize;