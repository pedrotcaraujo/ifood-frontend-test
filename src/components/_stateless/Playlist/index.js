import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';

const Playlist = ({image, name}) => (
    <figure className="Playlist">
        <div className="Playlist-play">
            <button className="Playlist-button"/>
            <img className="Playlist-image" src={image} alt={name}/>
        </div>
        <figcaption className="Playlist-figcaption">{name}</figcaption>
    </figure>
);

Playlist.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Playlist;