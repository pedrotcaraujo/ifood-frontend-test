import React, { Component } from 'react';
import './Dropdown.css';
import randomString from '../../../../utils/randomString'

class Dropdown extends Component {
    render() {
        return (
            <div className="Dropdown">
                {this.props.label && <label className="Dropdown-label">{this.props.label}</label>}
                <select className="Dropdown-field" {...this.props.dropdownProps}>
                    {this.props.options.map(option => (
                       <option key={randomString(16)} value={option.value}>{option.name}</option>
                    ))}
                </select>
            </div>
        )
    }
}

export default Dropdown;