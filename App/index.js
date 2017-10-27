import React from 'react'
import ReactDOM from 'react-dom'
import { StripeProvider } from 'react-stripe-elements';

import './index.scss'

import firebase from 'firebase'

import Landing from './Components/Landing/Landing'
import Product from './Components/Product/Product'
import Checkout from './Components/Checkout/Checkout'

import edgy_silver from './edgy_silver.jpg'
import bold_black from './bold_black.jpg'

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
                { id: 1, name: 'Edgy Silver', image: edgy_silver, price: 29900, details: {
                    size: '38x26x16CM',
                    material: 'Holographic plastic',
                    material__inner: 'Polyester, grey',
                    pockets: 'Laptop, Smartphone, Inner',
                    description: 'GNDRS backpack is a new alternative to the outdated idea that backpacks are simply an item to carry your day to day belongings. This backpack is a statement. If people are bringing you down, it only means you are extra.'
                } },
                { id: 2,name: 'Bold Black', image: bold_black, price: 29900, details: {
                        size: '38x26x16CM',
                        material: 'Holographic plastic',
                        material__inner: 'Polyester, black',
                        pockets: 'Laptop, Smartphone, Inner',
                        description: 'GNDRS backpack is a new alternative to the outdated idea that backpacks are simply an item to carry your day to day belongings. This backpack is a statement. If people are bringing you down, it only means you are extra.'
                } }
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
    <StripeProvider apiKey='pk_live_74QMtmndrvmUIHIQFGKwXP7B'>
        <RootWrapper />
    </StripeProvider>,
    document.getElementById('App')
)
