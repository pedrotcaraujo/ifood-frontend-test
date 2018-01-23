import React, { Component } from 'react';

class Dropdown extends Component {
    render() {
        return (
            <div>
                {this.props.label && <label>{this.props.label}</label>}
                <select {...this.props.dropdownProps}>
                    {this.props.options.map(option => (
                       <option key={option.value} value={option.value}>{option.name}</option>
                    ))}
                </select>
            </div>
        )
    }
}

export default Dropdown;