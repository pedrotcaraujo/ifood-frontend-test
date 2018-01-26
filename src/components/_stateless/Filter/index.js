import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Dropdown, Input } from '../Fields';
import './Filter.css';

import debounce from '../../../utils/debounce';

const DEBOUNCE_TIMOUT = 1000;
const FILTER = {}

const supportedFilters = {
    locale: (data, onChange) => renderDropdown(data, onChange),
    country: (data, onChange) => renderDropdown(data, onChange),
    limit: (data, onChange) => (
        <Input key={data.id} 
            inputProps={{
                placeholder: `${data.name} min: ${data.validation.min} max: ${data.validation.max}`,
                name: data.id,
                type: 'number',
                max: data.validation.max,
                min: data.validation.min,
                onChange: (evt) => _handleChange(evt, onChange)
            }}
        />),
    offset: (data, onChange) => (
        <Input key={data.id} 
            inputProps={{
                placeholder: data.name,
                name: data.id,
                type: 'number',
                onChange: (evt) => _handleChange(evt, onChange)

            }}
         />
    )
};

const renderDropdown = (data, onChange) => (
    <Dropdown key={data.id} 
        dropdownProps={{ 
            name: data.id, 
            onChange: (evt) => _handleChange(evt, onChange) 
        }} 
        options={[{name: data.name, value: ''}, ...data.values]} 
/>);


// Render the filter fields by reflection
const renderFilter = (filter, onChange) => typeof supportedFilters[filter.id] === 'function' && supportedFilters[filter.id](filter, onChange)


// Handle all filters and send by props onChange
const _handleChange = (evt, action) => {
    evt.persist();
    debounce(({ target }, action) => {
        const current = {
            name: target.name,
            value: target.value
        }

        FILTER[current.name] = current.value;
        FILTER.timestamp = moment().format();

        action({ current, data: FILTER })
    }, DEBOUNCE_TIMOUT)(evt, action);
}

const Filter = ({data, onChange}) => (
    <div className="Filter">
        <Input 
            inputProps={{
                placeholder: "Buscar por nome",
                name: 'search',
                type: 'text',
                onChange: (evt) => _handleChange(evt, onChange)
            }}
        />
        {data.filters.map((filter) => renderFilter(filter, onChange))}
    </div>
)

Filter.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Filter;