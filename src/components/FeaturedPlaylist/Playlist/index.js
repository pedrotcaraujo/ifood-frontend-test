import React, { Component } from 'react';

class Playlist extends Component {
    render() {
        return (
            <ul>
            {this.props.data.items.map(item => (
                <li key={item.id}>
                    <figure>
                        <img src={item.images[0].url} alt={item.name}/>
                        <figcaption>{item.name}</figcaption>
                    </figure>
                </li>                    
            ))}
            </ul>
        )
    }
}

export default Playlist;