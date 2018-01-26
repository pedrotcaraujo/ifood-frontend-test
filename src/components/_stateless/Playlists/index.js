import React from 'react';
import PropTypes from 'prop-types';
import Playlist from '../Playlist';
import fuzzySearch from '../../../utils/fuzzySearch';
import './Playlists.css';

const Playlists = ({data, search, onPlay}) => (
    <div className="Playlists">
        <h2 className="Playlists-message">{data.message}</h2>
        <ul className="Playlists-items">
        {data.playlists.items.filter(item => fuzzySearch(item.name, search)).map(item => (
            <li onClick={() => onPlay(item)} className="Playlists-item" key={item.id}>
                <Playlist name={item.name} image={item.images[0].url}/>
            </li>                    
        ))}
        </ul>

    </div>
);

Playlists.propTypes = {
    data: PropTypes.object.isRequired,
    search: PropTypes.string,
    onPlay: PropTypes.func
};


export default Playlists;