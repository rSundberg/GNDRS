import React, { Component } from 'react'
import Logo from './GNDRS.svg'
import Bg from './bg.jpg'
import './Landing.scss'

class Landing extends Component {
    render() {
        return (
            <div className='landing'>
                <Logo className='landing__logo' />
                <div className='landing__background'>
                    <img src={Bg} />
                </div>
            </div>
        );
    }
}

export default Landing