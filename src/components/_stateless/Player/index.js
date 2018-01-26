import React from 'react';
import PropTypes from 'prop-types'
import './Player.css'

const Player = ({ data }) => (
    <div className="Player">
        <iframe title="spotify player" src={`https://open.spotify.com/embed?uri=${data.uri}`} width="100%" height="85px" frameBorder="0" allowtransparency="true"></iframe>
    </div>
)

Player.propTypes = {
    data: PropTypes.object.isRequired
}

export default Player;