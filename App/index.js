import React from 'react'
import ReactDOM from 'react-dom'
import { Main, NavigationBar, Logo, Menu, SignUp, Items } from './index.scss'

import firebase from 'firebase'

import Item from './Components/Item/Item'

firebase.initializeApp({
    apiKey: "AIzaSyCG8Eb9-TZkdciu28ue33LNeY9fRopGG_w",
    authDomain: "gndrs-49336.firebaseapp.com",
    databaseURL: "https://gndrs-49336.firebaseio.com",
    projectId: "gndrs-49336",
    storageBucket: "gndrs-49336.appspot.com",
    messagingSenderId: "151611509859"
})

function Wrapper(props) {
    return <div className={props.page}>{props.children}</div>
}

class RootWrapper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            input: {
                name: '',
                email: ''
            }
        }

        this.setName = this.setName.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.submitInput = this.submitInput.bind(this)
    }

    setName(e) {
        e.persist()
        this.setState(prevState => ({
            input: {
                name: e.target.value,
                email: prevState.input.email
            }
        }))
    }

    setEmail(e) {
        e.persist()
        this.setState(prevState => ({
            input: {
                name: prevState.input.name,
                email: e.target.value
            }
        }))
    }

    submitInput() {
        firebase.database().ref('signup').push(this.state.input)
    }

    render () {
        return (
            <div className={ Main }>
                <Wrapper page={ Items }>
                    <Item
                        src={'https://i.pinimg.com/736x/41/cc/cd/41cccdaad9f3a36915a8f0a755c02e7a--holographic-bag-holographic-fashion.jpg'}
                        name={'Sparkly Black'}
                    />
                    <Item
                        src={'https://i.pinimg.com/736x/41/cc/cd/41cccdaad9f3a36915a8f0a755c02e7a--holographic-bag-holographic-fashion.jpg'}
                        name={'Colorful White'}
                        reverse={true}
                    />
                </Wrapper>
                {/* <Wrapper page={ SignUp }>
                    <h2 key='SignupHead' className='signup__text'>HEJ</h2>
                    <input key='SignupName' className='signup__input' id='SignupName' onChange={this.setName} />
                    <input key='SignupEmail' className='signup__input' id='SignupEmail' onChange={this.setEmail}/>
                    <button onClick={this.submitInput}>Submit</button>
                </Wrapper> */}
                <Wrapper page={NavigationBar}>
                    <h1 className={Logo}>GNDRS</h1>
                    <div className={Menu}></div>
                </Wrapper>
            </div>
        )
    }
}

ReactDOM.render(<RootWrapper/>, document.getElementById('App'))