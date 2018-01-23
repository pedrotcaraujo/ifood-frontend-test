import React, {Component } from 'react';
import axios from 'axios';
import { Dropdown, Input } from '../Form';
import Loader from '../Loader';

import FeaturedPlaylistDispatcher from '../../dispatchers/FeaturedPlaylistDispatcher';
import FilterConstants from '../../constants/FilterConstants';

import debounce from '../../utils/debounce';

const URL = 'http://www.mocky.io/v2/5a25fade2e0000213aa90776'

class Filter extends Component {
    constructor() {
        super()
        this.state = { 
            loaded: false,
            filters: []
        };
        this.data = {}; 
    }
    componentDidMount() {
        axios.get(URL)
            .then(({ data }) => this.setState({loaded: true, ...data}))
            .catch(err => console.log(err));
    }

    handleChange = (evt) => {
        console.log(evt.target.value);
        if (!evt.target.value) return;

        this.data[evt.target.name] = evt.target.value;
        debounce(FeaturedPlaylistDispatcher.dispatch({
            type: FilterConstants.UPDATE,
            data: Object.assign({}, this.data)
        }), 400);
    }

    locale(data) {
        return <Dropdown 
                    dropdownProps={{ 
                        name: data.id,
                        onChange: this.handleChange
                    }}
                    options={[{name: data.name}, ...data.values]} 
                />
    }
    country(data) {
        return <Dropdown 
                    dropdownProps={{ 
                        name: data.id,
                        onChange: this.handleChange
                    }} 
                    options={[{name: data.name}, ...data.values]} 
                />
    }
    timestamp(data) {
        return <Input 
                    label={data.name}
                    inputProps={{
                        name: data.id,
                        type: 'datetime-local',
                        onChange: this.handleChange
                    }}
                />
    }
    limit(data) {
        return  <Input 
                    label={data.name}
                    inputProps={{
                        name: data.id,
                        type: 'number',
                        max: data.validation.max && data.validation.max,
                        min: data.validation.min && data.validation.min,
                        onChange: this.handleChange
                    }}
                />
    }
    offset(data) {
        return <Input 
                    label={data.name}
                    inputProps={{
                        name: data.id,
                        type: 'number',
                        onChange: this.handleChange

                    }}
                />
    }

    render() {
        return (
            <Loader loaded={this.state.loaded}>
                {this.state.filters && this.state.filters.map(filter => this[filter.id](filter))}
            </Loader>
        )
    }
}

export default Filter;