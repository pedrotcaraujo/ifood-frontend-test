import React, { Component } from 'react';
import Input from '../Form/Input';

class Search extends Component {
    render() {
        return (
            <Input 
            label="Buscar por nome" 
            inputProps={{
                name: 'search',
                type: 'text',
                onChange: this.handleChange
            }}
        />
        )
    }
}

export default Search;