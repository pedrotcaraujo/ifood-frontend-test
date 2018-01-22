import React, { Fragment, Component } from 'react';
import FilterPlaylist from './FilterPlaylist';
import Playlist from './Playlist';
import axios from 'axios';

const URL = 'https://api.spotify.com/v1/browse/featured-playlists';
const PULLING_TIMEOUT = 30000;

class FeaturedPlaylist extends Component {
    constructor() {
        super()
        this.state = { data: null }
    }
    componentDidMount() {
        if (this.props.token) {
            window.requestAnimationFrame(() => this.update(this));
        }
    }

    update(context) {
        axios.get(URL, {
            headers: {
              'Authorization': 'Bearer ' + context.props.token
            }
        })
        .then(({ data }) => {
            context.setState({ data });
            context.pulling(PULLING_TIMEOUT, () => context.update(context));
        })
        .catch(this.props.onError);
    }

    pulling(timeout, callback) {
        setTimeout(() => window.requestAnimationFrame(callback), timeout);
    }

    onFilterChange = (params) => {
        this.update(this, params);
    }

    render() {
        return (
            <Fragment>
                {this.state.data && (
                    <div>
                        <h2>{this.state.data.message}</h2>
                        <FilterPlaylist onChange={this.onFilterChange} />
                        <Playlist data={this.state.data.playlists}/>
                    </div>
                )}
            </Fragment>
        )
    }
}

export default FeaturedPlaylist