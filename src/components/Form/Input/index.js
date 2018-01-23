import React, { Component } from 'react';

class Input extends Component {
    render() {
        return (
            <div>
                {this.props.label && <label>{this.props.label}</label>}
                <input {...this.props.inputProps}/>
            </div>
        )
    }
}

export default Input;