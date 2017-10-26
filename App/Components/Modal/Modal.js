import React, { Component } from 'react'
import { createPortal } from 'react-dom'

class Modal extends Component {
    constructor(props) {
        super(props)

        this.el = document.createElement('div');
    }
    render() {
        return createPortal(
            this.props.children,
            document.querySelector('.main')
        )
    }
}

export default Modal