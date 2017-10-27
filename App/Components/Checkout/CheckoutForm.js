import React, { Component } from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import fetch from 'isomorphic-fetch';

import CustomLabel from './CustomLabel';

class CheckoutForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
            name: null,
            email: null,
            address_line1: null,
            address_city: null,
            address_zip: null,
            address_country: null
        }
    }

    setName = e => this.setState({name: e.currentTarget.value})

    setEmail = e => this.setState({email: e.currentTarget.value})

    setAddress = e => this.setState({address_line1: e.currentTarget.value})

    setCity = e => this.setState({address_city: e.currentTarget.value})

    setZipCode = e => this.setState({address_zip: e.currentTarget.value})

    setCountry = e => this.setState({address_country: e.currentTarget.value})

    handleSubmit = e => {
        e.preventDefault()
        e.persist()

        const tokenData = Object.keys(this.state).reduce((x, y) => {
            if (y !== 'disabled') {
                x[y] = this.state[y]
            }

            return x
        }, {})

        const noInfo = Object.keys(tokenData).some(key => tokenData[key] === null)

        if (this.state.disabled === true || noInfo) {
            return;
        }

        this.setState(
            {disabled: true},
            () => {
                this.props.stripe.createToken(tokenData).then(({ token }) => {
                    token.amount = this.props.total
                    console.log(this.props.total)
                    fetch('https://us-central1-gndrs-49336.cloudfunctions.net/charge', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(token)
                    })
                    .then(response => {
                        console.log(response)
                        this.props.success()
                    })
                    .catch(err => {
                        this.setState({disabled: false})
                    })
                });
            }
        )
    }

    render() {
        return (
            <form className='checkout__form' onSubmit={this.handleSubmit} autoComplete='on'>
                <CustomLabel>
                    <span className='checkout__name'>Name</span>
                    <input className='checkout__input' onChange={this.setName} type='text'/>
                </CustomLabel>

                <CustomLabel>
                    <span className='checkout__name'>Email</span>
                    <input className='checkout__input' onChange={this.setEmail} type='email' autoComplete="home email"/>
                </CustomLabel>

                <CustomLabel>
                    <span className='checkout__name'>Address</span>
                    <input className='checkout__input' onChange={this.setAddress} type='text' autoComplete='shipping street-address'/>
                </CustomLabel>

                <CustomLabel>
                    <span className='checkout__name'>City</span>
                    <input className='checkout__input' onChange={this.setCity} type='text'/>
                </CustomLabel>

                <CustomLabel>
                    <span className='checkout__name'>ZIP code</span>
                    <input className='checkout__input' onChange={this.setZipCode} type='text' autoComplete='shipping postal-code'/>
                </CustomLabel>

                <CustomLabel>
                    <span className='checkout__name'>Country</span>
                    <input className='checkout__input' onChange={this.setCountry} type='text' autoComplete="shipping country-name"/>
                </CustomLabel>

                <CardElement style={{ base: { fontSize: '18px' } }} />

                <button className='checkout__submit-button' type='submit'>Confirm pre-order</button>
            </form>
        );
    }
}

export default injectStripe(CheckoutForm)