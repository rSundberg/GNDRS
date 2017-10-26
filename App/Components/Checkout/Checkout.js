import React, { Component } from 'react'
import { Elements } from 'react-stripe-elements'
import './Checkout.scss'

import Trash from './trash.svg'

import CheckoutForm from './CheckoutForm'
import PaymentRequestForm from './PaymentRequestForm'
import ProductInfo from './ProductInfo'

class Checkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            default: false
        }        
    }

    hashCode = () => `_${Math.random().toString(36).substr(2, 9)}`;

    showDefault = e => this.setState({default: true})

    totalSum = bag => bag.reduce((sum, x) => sum += x.price, 0) / 100

    render() {
        return (
            <div className='checkout'>
                <div className='checkout__header'>
                    <h2>Checkout</h2>
                    {this.props.bag.length ? <Trash className="checkout__trash" onClick={this.props.clear}/> : null}
                </div>

                {
                this.props.bag.length ?
                    <div className='checkout__product-info'>
                        {this.props.bag.map(x => <ProductInfo key={this.hashCode(x.name)} {...x} />)}
                        <div className="checkout__product-info-total">
                            <h3>Total</h3>
                            <span>{`${this.totalSum(this.props.bag)} SEK`}</span>
                        </div>
                    </div> : null
                }

                {!this.state.default ? <button className='checkout__submit-button' onClick={this.showDefault}>Pay with card</button> : null}

                {
                this.state.default ?
                    <Elements>
                        <CheckoutForm />
                    </Elements> : null
                }

                {
                <Elements>
                    <PaymentRequestForm showDefault={this.showDefault} />
                </Elements >
                }
            </div>
        );
    }
}

export default Checkout