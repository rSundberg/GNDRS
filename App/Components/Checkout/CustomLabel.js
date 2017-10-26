import React, { Component } from 'react'
import Anime from 'animejs'

class CustomLabel extends Component {
    componentWillMount() {

    }

    focus = (e) => {
        e.preventDefault();

        Anime({
            targets: e.currentTarget.children[0], //label name
            translateY: -30,
            fontSize: 12,
            elasticity: 0,
            duration: 300
        })
    }

    render() {
        return (
            <label className='checkout__label' onFocus={this.focus}>
                {this.props.children}
            </label>
        );
    }
}

export default CustomLabel