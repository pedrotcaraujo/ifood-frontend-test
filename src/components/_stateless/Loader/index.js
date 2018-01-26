import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

const Loader = ({loaded, children}) => (
    <Fragment>
    {loaded ? children : (
        <div className="Loader"></div>
    )}
    </Fragment>
);

Loader.propTypes = {
    loaded: PropTypes.bool.isRequired
}

export default Loader;