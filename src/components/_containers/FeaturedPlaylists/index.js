import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import removeEmpty from '../../../utils/removeEmpty';

import axios from 'axios';

import Playlists from '../../_stateless/Playlists';
import Player from '../../_stateless/Player';
import Loader from '../../_stateless/Loader';

import FilterStore from '../../../stores/FilterStore'

const URL_SPOTIFY = 'https://api.spotify.com/v1/browse/featured-playlists';
const PULLING_TIMEOUT = 30000;

class FeaturedPlaylists extends Component {
    state = {
        filter: {},
        playlistsAPI: { 
            isLoaded: false, 
            data: {} 
        }, 
        player: { 
            isPlayling: false, 
            data: {} 
        }
    }

    timeouts = []

    componentDidMount() {
        FilterStore.addListener(this.handleFilter)
        if (this.props.token) {
            window.requestAnimationFrame(() => this.updatePlaylists(this));
        }
    }

    componentWillUnmount() {
        window.clearTimeout(this.timeout);
    }

    updatePlaylists = async (context, params = {}) => {
        context.setState({...context.state, ...{ 
            playlistsAPI: { 
                isLoaded: false,
                data: {}
            } 
        } });

        try {
            const data = await axios.get(URL_SPOTIFY, { params, headers: { 'Authorization': 'Bearer ' + context.props.token } }).then(({ data }) => data)
            context.setState({...context.state, ...{ 
                playlistsAPI: {
                    isLoaded: true, 
                    data 
                }
            } });
            
            context.pulling(PULLING_TIMEOUT, () => context.updatePlaylists(context, params));
        } catch(err) {
            context.setState({...context.state, ...{ 
                playlistsAPI: {
                    isLoaded: true, 
                    data: {
                        message: 'Não foi possível fazer a busca, tente novamente...',
                        playlists: {
                            items: []
                        }
                    }
                }
            } } );
        }
    }

    pulling(timeout, callback) {
        this.timeouts.push(window.setTimeout(() => window.requestAnimationFrame(callback), timeout));
    }

    handleFilter = () => {
        const { current, data } = FilterStore.getState();;
        const { search, ...params } = data;

        if (current.name === 'search') {
            this.setState({...this.state, filter: data })
            return;
         }

        if (this.timeouts.length > 0) {
            this.timeouts.forEach(timeout => {
                window.clearTimeout(timeout)
            })
        }

        if (this.state.playlistsAPI.isLoaded) {
            this.updatePlaylists(this, removeEmpty(params));
        }
    }

    onPlayAPlaylist = (playlist) => {
        this.setState({...this.state, player: { isPlayling: true, data: playlist } })
    }

    render() {
        const { filter, playlistsAPI, player } = this.state;
        return (
            <Fragment>
                <Loader loaded={playlistsAPI.isLoaded}>
                    <Playlists search={filter.search} data={playlistsAPI.data} onPlay={this.onPlayAPlaylist}/>
                </Loader>
                {player.isPlayling && <Player data={player.data} />}
            </Fragment>
        )
    }
}

FeaturedPlaylists.propTypes = {
    token: PropTypes.string.isRequired
};

export default FeaturedPlaylists;