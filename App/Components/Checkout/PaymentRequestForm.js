import React, { Component } from 'react'
import { injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements';
import fetch from 'isomorphic-fetch';

class PaymentRequestForm extends Component {
    constructor(props) {
        super(props);

        const paymentRequest = props.stripe.paymentRequest({
            country: 'SE',
            currency: 'sek',
            total: {
                label: 'GNDRS Checkout total',
                amount: this.props.total,
            },
        });

        paymentRequest.on('token', ({ complete, token, ...data }) => {
            fetch('https://us-central1-gndrs-49336.cloudfunctions.net/charge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(token)
            }).then(response => console.log(response))

            complete('success');
        });

        paymentRequest.canMakePayment().then(result => {
            this.setState({ canMakePayment: !!result });

            if (!result) {
                this.props.showDefault();
            }
        });

        this.state = {
            canMakePayment: false,
            paymentRequest,
        };
    }

    render() {
        return this.state.canMakePayment ? (
            <PaymentRequestButtonElement
                paymentRequest={this.state.paymentRequest}
                className="PaymentRequestButton"
                style={{
                    paymentRequestButton: {
                        theme: 'dark',
                        height: '64px'
                    },
                }}
            />
        ) : null;
    }
}
export default injectStripe(PaymentRequestForm);