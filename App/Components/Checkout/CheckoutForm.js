import React, { Component } from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import fetch from 'isomorphic-fetch';

import CustomLabel from './CustomLabel';

class CheckoutForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            validated: true,
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

        const noInfo = Object.keys(this.state).some(key => this.state[key] === null)

        if (noInfo) {
            this.setState({ validated: false })
            return;
        }

        this.props.disable(true)

        this.props.stripe.createToken(this.state).then(({ token }) => {
            if (!token) {
                this.setState({ validated: false })
                this.props.disable(false)
                return;
            }

            token.amount = this.props.total
            token.items = this.props.items

            fetch('https://us-central1-gndrs-49336.cloudfunctions.net/charge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(token)
            })
            .then(response => {
                if (response.ok) {
                    this.props.success()
                    this.setState({ tryAgain: false, validated: true })
                } else {
                    this.props.disable(false)
                    this.setState({ tryAgain: true, validated: true })
                }
            })
            .catch(err => {
                this.props.disable(false)
                this.setState({ tryAgain: true })
            })
        });
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

                {
                    this.state.tryAgain ? <h3 className='checkout__try-again'>Something went wrong, please try again!</h3> : null
                }

                {
                    !this.state.validated ? <h3 className='checkout__try-again'>Please fill all the required fields</h3> : null
                }

                <button className='checkout__submit-button' type='submit'>Confirm pre-order</button>
            </form>
        );
    }
}

export default injectStripe(CheckoutForm)