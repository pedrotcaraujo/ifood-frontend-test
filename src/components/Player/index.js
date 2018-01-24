import React, { Fragment, Component } from 'react';
import './Player.css'

import PlaylistsStore from '../../stores/PlaylistsStore'

class Player extends Component {
    state = {
        playing: false
    }

    componentDidMount() {
        PlaylistsStore.addListener(this.onPlaylistsChange);
    }

    componentWillUnmount() {
        PlaylistsStore.removeListener(this.onPlaylistsChange);
    }

    onPlaylistsChange = () => {
        this.setState({
            playing: true,
            data: PlaylistsStore.getState().playing
        })
    }
    render() {
        return (
            <Fragment>
                {this.state.playing && (
                    <div className="Player">
                        <iframe title="spotify player" src={`https://open.spotify.com/embed?uri=${this.state.data.uri}`} width="100%" height="85px" frameBorder="0" allowtransparency="true"></iframe>
                    </div>
                )}
            </Fragment>
        )
    }
}

export default Player;