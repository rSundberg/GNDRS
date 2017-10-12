import React from 'react'
import ReactDOM from 'react-dom'
import Anime from 'animejs'
import './index.scss'

import firebase from 'firebase'

import StartProductReel from './Components/StartProductReel/StartProductReel'
import NavigationBar from './Components/NavigationBar/NavigationBar'

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
            scroll: {
                value: 0,
                percent: 0
            }
        }
    }
    
    render () {
        return (
            <div className='main'>
                <div className='main__scroller'></div>
                <StartProductReel/>
            </div>
        )
    }
}

ReactDOM.render(<RootWrapper/>, document.getElementById('App'))