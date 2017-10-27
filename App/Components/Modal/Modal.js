import React, { Component } from 'react'
import Anime from 'animejs'
import './Modal.scss'

class Modal extends Component {
    constructor(props) {
        super(props)

        this.el = document.createElement('div');
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={this.props.class}>
                {this.props.children}
            </div>
        )
    }
}

export default Modal