import React, {Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Dropdown, Input } from '../Form';
import Loader from '../Loader';
import './Filter.css';

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
        this.debouncedChange = debounce(this.onChange, 1000);
    }
    componentDidMount() {
        axios.get(URL)
            .then(({ data }) => this.setState({loaded: true, ...data}))
            .catch(err => console.log(err));
    }

    handleChange = (evt) => {
        evt.persist();
        this.debouncedChange(evt);
    }

    onChange = (evt) => {        
        const current = {
            name: evt.target.name,
            value: evt.target.value
        }

        this.data[current.name] = current.value;
        this.data.timestamp = moment().format();

        FeaturedPlaylistDispatcher.dispatch({
            type: FilterConstants.UPDATE,
            data: Object.assign({}, { 
                current: current, 
                data: this.data
            })
        })
    }

    build = (data) => {
        return typeof this[data.id] === 'function' && this[data.id](data)
    }

    locale(data) {
        return <Dropdown
                    key={data.id} 
                    dropdownProps={{ 
                        name: data.id,
                        onChange: this.handleChange
                    }}
                    options={[{name: data.name, value: ''}, ...data.values]} 
                />
    }
    country(data) {
        return <Dropdown 
                    key={data.id} 
                    dropdownProps={{ 
                        name: data.id,
                        onChange: this.handleChange
                    }} 
                    options={[{name: data.name, value: ''}, ...data.values]} 
                />
    }
    limit(data) {
        return  <Input 
                    key={data.id} 
                    inputProps={{
                        placeholder: data.name,
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
                    key={data.id} 
                    inputProps={{
                        placeholder: data.name,
                        name: data.id,
                        type: 'number',
                        onChange: this.handleChange

                    }}
                />
    }

    render() {
        return (
            <Loader loaded={this.state.loaded}>
                <div className="Filter">
                    <Input 
                        inputProps={{
                            placeholder: "Buscar por nome",
                            name: 'search',
                            type: 'text',
                            onChange: this.handleChange
                        }}
                    />
                    {this.state.filters.map(this.build)}
                </div>
            </Loader>
        )
    }
}

export default Filter;