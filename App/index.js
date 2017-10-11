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

        this.setWindowPos = this.setWindowPos.bind(this)
    }

    componentDidMount() {
        document.addEventListener('scroll', this.setWindowPos)   
    }

    setWindowPos(e) {
        // if (window.pageYOffset < this.state.windowPos) {
        //     this.setState(prevState => ({ windowPos: prevState.windowPos += 1 }))   
        // } else {
        //     this.setState(prevState => ({ windowPos: prevState.windowPos -= 1 }))
        // }
        var winHeight = window.innerHeight;

        // Annoying to compute doc height due to browser inconsistency
        var body = document.body;
        var html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        var value = window.pageYOffset;

        var max = docHeight - winHeight;
        var percent = (value / max) * 100;

        this.setState({scroll: {value: Math.round(value), percent: percent}})

    }
    
    render () {
        return (
            <div className='main'>
                <div className='main__scroller'></div>
                <StartProductReel

                    scrollValue={this.state.scroll.value}

                    scrollPercent={this.state.scroll.percent}

                />
            </div>
        )
    }
}

ReactDOM.render(<RootWrapper/>, document.getElementById('App'))