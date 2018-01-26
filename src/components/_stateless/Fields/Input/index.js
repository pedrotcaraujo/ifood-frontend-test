import React, { Component } from 'react';
import './Input.css'

class Input extends Component {
    render() {
        return (
            <div className="Input">
                {this.props.label && <label className="Input-label">{this.props.label}</label>}
                <input className="Input-field" {...this.props.inputProps}/>
            </div>
        )
    }
}

export default Input;