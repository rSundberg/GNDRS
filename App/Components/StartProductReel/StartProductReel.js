import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './StartProductReel.scss'
import Anime from 'animejs'

class Image extends Component {
    shouldComponentUpdate() {
        return false
    }

    render(){
        console.log('heyyy')
        return (
            <div className='StartProductReel__image'>
                <img src={this.props.src} />
            </div>
        )
    }
}

class Text extends Component {
    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <div className='StartProductReel__text'>
                <div className='StartProductReel__name'>
                    {this.props.name}
                </div>
                <div className='StartProductReel__divider'>

                </div>
                <div className='StartProductReel__action'>

                </div>
            </div>
        )
    }
}

class ScrollPane extends Component {

    static contextTypes = {
        registerPane: PropTypes.func.isRequired,
        unregisterPane: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.context.registerPane(this.el)
    }

    componentWillUnmount() {
        this.context.unregisterPane(this.el)
    }

    render() {
        return (
            <div className={this.props.class} ref={(el) => { this.el = el }}>
                {this.props.children}
            </div>
        )
    }
}

class StartProductReel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [
                {
                    src: 'https://i.pinimg.com/736x/41/cc/cd/41cccdaad9f3a36915a8f0a755c02e7a--holographic-bag-holographic-fashion.jpg',
                    name: 'Edgy Silver',
                    price: 749
                },
                {
                    src: 'https://i.pinimg.com/736x/41/cc/cd/41cccdaad9f3a36915a8f0a755c02e7a--holographic-bag-holographic-fashion.jpg',
                    name: 'Bold Black',
                    price: 749
                }
            ]
        }

    }

    static childContextTypes = {
        registerPane: PropTypes.func,
        unregisterPane: PropTypes.func
    }

    getChildContext() {
        return {
            registerPane: this.registerPane,
            unregisterPane: this.unregisterPane
        }
    }

    panes = []

    registerPane = (node) => {
        console.log(node)
        if (!this.findPane(node)) {
            this.addEvents(node)
            this.panes.push(node)
        }
    }

    unregisterPane = (node) => {
        if (this.findPane(node)) {
            this.removeEvents(node)
            this.panes.splice(this.panes.indexOf(node), 1)
        }
    }

    addEvents = (node) => {
        window.onscroll = this.handlePaneScroll.bind(this, node)

        node.imageAnimation = Anime({
            targets: '.StartProductReel__image',
            translateX: [
                { value: '-20vw', duration: 0 },
                { value: '+=40vw', duration: 1000 }
            ],
            translateY: [
                { value: '+80vh', duration: 0 },
                { value: '-=40vh', duration: 1000 }
            ],
            scale: '+=0.1',
            duration: 1000,
            autoplay: false,
            easing: 'easeInOutSine'
        })

        node.textAnimation = Anime({
            targets: '.StartProductReel__text',
            translateX: [
                { value: '0', duration: 0 },
                { value: '+=20vw', duration: 1000 }
            ],
            translateY: '+=50',
            opacity: [
                { value: 0, duration: 0 },
                { value: 1 }
            ],
            scale: '+=0.1',
            duration: 1000,
            autoplay: false,
            easing: 'easeInOutSine'
        })
    }

    removeEvents = (node) => {
        node.onscroll = null

        node.imageAnimation = null

        node.textAnimation = null
    }

    findPane = node => this.panes.find(pane => pane === node)

    handlePaneScroll = (node) => {
        window.requestAnimationFrame(() => {
            // Calculate new scrollTop positions
            // for left and right panes based on
            // DOM nodes and evt.target.scrollTop
            // and set it directly on DOM nodes
            this.panes.forEach((pane) => {
                const winHeight = window.innerHeight;
                const body = document.body;
                const html = document.documentElement;
                const docHeight = Math.max(body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight);

                const value = window.pageYOffset;
                console.log(window.pageYOffset)
                const max = docHeight - winHeight;
                const percent = (value / max) * 100;
                console.log(percent)
                console.log(node.imageAnimation.animatables)
                node.imageAnimation.seek(node.imageAnimation.duration * (percent / 10))
                node.textAnimation.seek(node.textAnimation.duration * (percent / 10))
            })
        })
    }

    render() {
        return (
            <div>
                <ScrollPane class='StartProductReel'>
                    <Image src={this.state.items[0].src}/>
                    <Text name={this.state.items[0].name}/>
                </ScrollPane>
            </div>
        )

    }
}

export default StartProductReel