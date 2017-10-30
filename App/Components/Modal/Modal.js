import React, { Component } from 'react'
import './Modal.scss'

class Modal extends Component {
    constructor(props) {
        super(props)
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