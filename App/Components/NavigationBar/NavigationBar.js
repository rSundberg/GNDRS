import React from 'react'
import {wrapper, logo} from './NavigationBar.scss'

const NavigationBar = (props) => {
    return (
        <div className={ wrapper } id={'navBar'}>
            <h1 className={`${logo}`}>GNDRS</h1>
        </div>
    );
};

export default NavigationBar