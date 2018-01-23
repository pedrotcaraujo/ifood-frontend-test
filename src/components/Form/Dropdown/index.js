import React, { Component } from 'react';
import './Dropdown.css';

class Dropdown extends Component {
    keyGenerator(value) {
        return `${value}-${Math.random().toString(36)}`;
    }
    render() {
        return (
            <div className="Dropdown">
                {this.props.label && <label className="Dropdown-label">{this.props.label}</label>}
                <select className="Dropdown-field" {...this.props.dropdownProps}>
                    {this.props.options.map(option => (
                       <option key={this.keyGenerator(option.value)} value={option.value}>{option.name}</option>
                    ))}
                </select>
            </div>
        )
    }
}

export default Dropdown;