import React, { Component } from 'react'
import anime from 'animejs'
import './loader.scss'

class Loader extends Component {
    componentDidMount() {
        anime({
            targets: '.loader__item',
            translateY: [
                {value: 0},
                {value: 10},
                {value: -10},
                {value: 0},
            ],
            loop: true,
            elasticity: 0,
            easing: 'easeInOutSine',
            duration: 500,
            delay: (el, i) => i * 200
        })
    }

    render() {
        return (
            <div className='loader'>
                <div className='loader__item'></div>
                <div className='loader__item'></div>
                <div className='loader__item'></div>
            </div>
        );
    }
}

export default Loader