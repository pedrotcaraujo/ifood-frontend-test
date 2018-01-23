import React, { Component } from 'react';
import axios from 'axios';
import './Playlist.css';

import FilterStore from '../../stores/FilterStore';

import Loader from '../Loader';

const URL = 'https://api.spotify.com/v1/browse/featured-playlists';
const PULLING_TIMEOUT = 30000;

class Playlist extends Component {
    constructor() {
        super()
        this.state = {
                loaded: false,
                message: null, 
                playlists: { 
                    items: [] 
                }
            }
        this.timeouts = [];
    }
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
        this.setState({ loaded: false })
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
        .catch(this.props.onError);
    }

    pulling(timeout, callback) {
        this.timeouts.push(window.setTimeout(() => window.requestAnimationFrame(callback), timeout));
    }

    onFilterChange = () => {
        if (this.timeouts.length > 0) {
            this.timeouts.forEach(timeout => {
                window.clearTimeout(timeout)
            })
        }

        if (this.state.loaded) {
            this.update(this, FilterStore.getState());
        }
    }

    render() {
        return (
            <Loader loaded={this.state.loaded}>
                <div>
                    <h2 className="Playlist-message">{this.state.message}</h2>
                    <ul className="Playlist">
                    {this.state.playlists.items.map(item => (
                        <li className="Playlist-item" key={item.id}>
                            <figure>
                                <img className="Playlist-image" src={item.images[0].url} alt={item.name}/>
                                <figcaption className="Playlist-figcaption">{item.name}</figcaption>
                            </figure>
                        </li>                    
                    ))}
                    </ul>
                </div>
            </Loader>
        )
    }
}

export default Playlist;