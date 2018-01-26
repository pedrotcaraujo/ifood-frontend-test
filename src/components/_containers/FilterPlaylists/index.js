import React, { Component } from 'react';

import axios from 'axios';

import FilterConstants from '../../../constants/FilterConstants';
import AppDispatcher from '../../../dispatchers/AppDispatcher';

import Filter from '../../_stateless/Filter';
import Loader from '../../_stateless/Loader';

const URL_FILTER = 'http://www.mocky.io/v2/5a25fade2e0000213aa90776';

class FilterPlaylists extends Component {
    state = {
        filter: {
            data: {}
        }, 
        filtersAPI: { 
            isLoaded: false, 
            data: {} 
        }
    }

    async componentDidMount() {
        try {
            const data = await axios.get(URL_FILTER).then(({ data }) => data);
            this.setState({...this.state, ...{ filtersAPI: { isLoaded: true, data } } });
        } catch(err) {
            const data = require('../../../data-filter').default;
            this.setState({...this.state, ...{ filtersAPI: { isLoaded: true, data } } });
        }

    }

    dispatch = (filter) => {
        AppDispatcher.dispatch({
            type: FilterConstants.UPDATE,
            data: filter
        })
    }

    render() {
        const { filtersAPI } = this.state;
        return (
            <Loader loaded={filtersAPI.isLoaded}>
                <Filter data={filtersAPI.data} onChange={this.dispatch}/>
            </Loader>
        )
    }
}

export default FilterPlaylists;