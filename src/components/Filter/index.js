import React, { Fragment, Component } from 'react';
import axios from 'axios';

const URL = 'http://www.mocky.io/v2/5a25fade2e0000213aa90776'

class Filter extends Component {
    constructor() {
        super()
        this.state = { data: null };
    }
    componentDidMount() {
        axios.get(URL)
            .then(({ data }) => this.setState(data))
            .catch(err => console.log(err));
    }

    buildFilters(filter) {
        if (filter.id === 'locale') {
            return (
                <select>
                    {filter.values.map(({value, name}) => <option key={value} value={value}>{name}</option>)}
                </select>
            )
        }

        if (filter.id === 'country') {
            return (
                <select>
                    {filter.values.map(({value, name}) => <option key={value} value={value}>{name}</option>)}
                </select>
            )
        }

        if (filter.id === 'timestamp') {
            return (
                <input type="date"/>
            )
        }

        if (filter.id === 'limit') {
            return (
                <input type="number" max="50" min="20"/>
            )
        }

        if (filter.id === 'offset') {
            return (
                <input type="number"/>
            )
        }
    }
    render() {
        return (
            <Fragment>
                {this.state.filters ? (
                    <div>
                        {this.state.filters.map(this.buildFilters)}
                    </div>
                ) : 'Loading...'}
            </Fragment>
        )
    }
}

export default Filter;