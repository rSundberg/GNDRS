import React from 'react'
import ReactDOM from 'react-dom'
import { StripeProvider } from 'react-stripe-elements';

import './index.scss'

import firebase from 'firebase'

import Navigation from './Components/Navigation/Navigation'
import Landing from './Components/Landing/Landing'
import Product from './Components/Product/Product'
import Checkout from './Components/Checkout/Checkout'

firebase.initializeApp({
    apiKey: "AIzaSyCG8Eb9-TZkdciu28ue33LNeY9fRopGG_w",
    authDomain: "gndrs-49336.firebaseapp.com",
    databaseURL: "https://gndrs-49336.firebaseio.com",
    projectId: "gndrs-49336",
    storageBucket: "gndrs-49336.appspot.com",
    messagingSenderId: "151611509859"
})

class RootWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bag: [],
            items: [
                { id: 1, name: 'Edgy silver', image: '', price: 29900 },
                { id: 2, name: 'Bold black', image: '', price: 29900 }
            ]
        }
    }

    addToBag = id => this.setState(prevState => ({
        bag: prevState.bag.concat(this.state.items.filter(x => x.id === id).map(x => x))
    }))

    clearBag = () => this.setState({bag: []})

    render = () => {
        return (
            <div className="main">
                <Landing />
                {
                    this.state.items.map(item => <Product key={item.id} {...item} addMe={this.addToBag.bind(this, item.id)}/>)
                }
                <Checkout bag={this.state.bag} clear={this.clearBag}/>
            </div>
        )
    }
}

ReactDOM.render(
    <StripeProvider apiKey='pk_test_QhUnHzCZbhzRxjhLre8jsgLV'>
        <RootWrapper />
    </StripeProvider>,
    document.getElementById('App')
)
