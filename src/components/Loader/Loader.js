import React from 'react';
import svg from '../../images/output.svg';
import './Loader.css';

function Loader() {
    return (
        <object type="image/svg+xml" data={svg}>
            Your browser does not support SVG
        </object>
    )
}

export default Loader;