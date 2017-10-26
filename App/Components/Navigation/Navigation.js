import React, { Component } from 'react'
import Anime from 'animejs'
import './Navigation.scss'

class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            items: [
                { name: 'Home', selected: true },
                { name: 'Products', selected: false },
                { name: 'About', selected: false },
                { name: 'Contact', selected: false },
            ]
        }
    }

    componentDidMount() {
        const isOdd = num => !!(num % 2)
        
        Anime({
            targets: '.Navigation__item',
            translateY: (el, i, totalEl) => {
                return `-${10 * i}vh`
            },
            translateX: (el, i, totalEl) => {
                return `-${10 * i / 2}vh`
            },
            duration: 1000
        })
    }

    handleClick = e => {
        this.state.items.forEach(child => console.log(child))
    }

    render() {
        return (
            <div className={'Navigation'} id={'Navigation'} onClick={this.handleClick}>
                {
                    this.state.items.map(item => {
                        let activeModifier = item.selected ? 'Navigation__item--selected' : ''

                        return <div key={item.name} className={`Navigation__item ${activeModifier}`}>{item.name}</div>
                    })
                }
            </div>
        );
    }
}

export default Navigation