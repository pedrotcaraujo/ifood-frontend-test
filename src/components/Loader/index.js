import React, { Fragment, Component } from 'react';
import './Loader.css';

class Loader extends Component {
    render() {
        return (
            <Fragment>
            {this.props.loaded ? this.props.children : (
                <div className="Loader" style={{...this.props.style}}></div>
            )}
            </Fragment>
        )
    }
}

export default Loader;