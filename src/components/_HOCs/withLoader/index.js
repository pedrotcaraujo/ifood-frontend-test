import React, { Component } from 'react';

const withLoader = (ComposedComponent) => class WithLoader extends Component {
    render() {
        return (
            <div>
                {this.props.active ? <span>Loading...</span> : <ComposedComponent {...this.props}/>}
            </div>
        )
    }
}