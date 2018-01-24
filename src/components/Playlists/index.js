import React, { Component } from 'react';
import axios from 'axios';
import { removeEmpty, fuzzySearch } from '../../utils';
import './Playlists.css';

import FeaturedPlaylistDispatcher from '../../dispatchers/FeaturedPlaylistDispatcher';
import PlaylistsConstants from '../../constants/PlaylistsConstants';
import FilterStore from '../../stores/FilterStore';

import Loader from '../Loader';

const URL = 'https://api.spotify.com/v1/browse/featured-playlists';
const PULLING_TIMEOUT = 300000;

class Playlists extends Component {    
    state = { loaded: false, search: '', message: null, playlists: { items: [] }, playing: {} }
    timeouts = []

    componentDidMount() {
        FilterStore.addListener(this.onFilterChange)
        if (this.props.token) {
            window.requestAnimationFrame(() => this.update(this));
        }
    }

    componentWillUnmount() {
        FilterStore.removeListener(this.onFilterChange)
        window.clearTimeout(this.timeout);
    }

    update(context, params = {}) {
        context.setState({ loaded: false })
        axios.get(URL, {
            params,
            headers: {
              'Authorization': 'Bearer ' + context.props.token
            }
        })
        .then(({ data }) => {
            context.setState({ loaded: true, ...data });
            context.pulling(PULLING_TIMEOUT, () => context.update(context, params));
        })
        .catch(() => {
            context.setState({ 
                loaded: true, 
                message: 'Não foi possível fazer a busca, tente novamente...',
                playlists: { 
                    items: [] 
                }
            })
        });
    }

    pulling(timeout, callback) {
        this.timeouts.push(window.setTimeout(() => window.requestAnimationFrame(callback), timeout));
    }

    onFilterChange = () => {
        const { current, data } = FilterStore.getState();
        const { search, ...params } = data;

        if (current.name === 'search') {
            this.setState(Object.assign({...this.state}, { search: current.value }))
            return;
         }

        if (this.timeouts.length > 0) {
            this.timeouts.forEach(timeout => {
                window.clearTimeout(timeout)
            })
        }

        if (this.state.loaded) {
            this.update(this, removeEmpty(params));
        }
    }

    onPlay(playlist) {
        FeaturedPlaylistDispatcher.dispatch({
            type: PlaylistsConstants.UPDATE,
            data: Object.assign({}, { 
                playing: playlist,
                playlists: this.state.playlists
            })
        })
    }

    render() {
        return (
            <Loader loaded={this.state.loaded}>
                <div className="Playlists">
                    <h2 className="Playlists-message">{this.state.message}</h2>
                    <ul className="Playlists-items">
                    {this.state.playlists.items.filter(item => fuzzySearch(item.name, this.state.search)).map(item => (
                        <li onClick={() => this.onPlay(item)} className="Playlists-item" key={item.id}>
                            <figure className="Playlists-figure">
                                <div className="Playlists-player">
                                    <button className="Playlists-button"/>
                                    <img className="Playlists-image" src={item.images[0].url} alt={item.name}/>
                                </div>
                                <figcaption className="Playlists-figcaption">{item.name}</figcaption>
                            </figure>
                        </li>                    
                    ))}
                    </ul>
  
                </div>
            </Loader>
        )
    }
}

export default Playlists;