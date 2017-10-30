import React, { Component } from 'react'
import { Elements } from 'react-stripe-elements'
import './Checkout.scss'

import Trash from './trash.svg'

import Modal from '../Modal/Modal'
import Loader from '../Loader/Loader'
import CheckoutForm from './CheckoutForm'
import PaymentRequestForm from './PaymentRequestForm'
import ProductInfo from './ProductInfo'

class Checkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            goTo: true,
            disabled: false,
            success: false
        }
    }

    componentDidMount() {
        document.body.onscroll = this.goToToggle
    }

    hashCode = () => `_${Math.random().toString(36).substr(2, 9)}`;

    totalSumConverted = bag => bag.reduce((sum, x) => sum += x.price, 0) / 100

    totalSum = bag => bag.reduce((sum, x) => sum += x.price, 0)

    goTo = e => {
        const scrollHeight = document.body.scrollHeight
        const windowHeight = e.target.parentElement.getBoundingClientRect().height
        const position = scrollHeight - windowHeight
        window.scrollTo(0, position);

        this.setState({goTo: false})
    }

    goToToggle = (e) => {
        const scrollTop = document.body.scrollTop
        const checkoutHeight = document.querySelector('.checkout').getBoundingClientRect().height
        const windowHeight = e.target.scrollHeight

        if (scrollTop > windowHeight - (checkoutHeight * 1.75)) {
            this.setState({ goTo: false })
            e.target.onscroll = null
        }
    }

    onSuccess = () => {
        this.setState(
            { success: true, disabled: false },
            () => this.props.clear()
        )
    }

    onDisable = (bool) => {
        this.setState({ disabled: bool })
    }

    render() {
        return (
            <div className='checkout'>
                {
                    this.state.disabled ?
                        <Modal class='modal'>
                            <h3>Please wait</h3>
                            <Loader />
                        </Modal> : null
                }

                {
                this.props.bag.length && this.state.goTo ?
                    <div className='checkout__go-to' onClick={this.goTo}>Checkout {this.props.bag.length}<span className='checkout__go-to-arrow'></span>
                    </div> : null
                }

                <div className='checkout__header'>
                    <h2>Checkout</h2>
                    {this.props.bag.length ? <Trash className="checkout__trash" onClick={this.props.clear}/> : null}
                </div>

                {
                this.props.bag.length && !this.state.success ?
                    <div className='checkout__product-info'>
                        {this.props.bag.map(x => <ProductInfo key={this.hashCode(x.name)} {...x} />)}
                        <div className="checkout__product-info-total">
                            <h3>Total</h3>
                            <span>{`${this.totalSumConverted(this.props.bag)} SEK`}</span>
                        </div>
                    </div> : null
                }

                { this.props.bag.length ? <div className='checkout__delivery'>Delivery in 12 weeks!</div> : null}

                {
                this.props.bag.length && !this.state.success ?
                    <Elements>
                        <CheckoutForm
                            total={this.totalSum(this.props.bag)}
                            items={this.props.bag}
                            success={this.onSuccess}
                            disable={this.onDisable}
                        />
                    </Elements> :
                    !this.state.success ?
                        <div className='checkout__no-items'>Ops, no items. Pick a bag!</div> :
                        <div className='checkout__no-items'>Payment successful!</div>
                }
            </div>
        );
    }
}

export default Checkout