import React, { Component } from 'react'
import Swipeable from 'react-swipeable'

import './StartProductReel.scss'
import Anime from 'animejs'

function Image(props) {
    return (
        <div className={`${props.class}`}>
            <img src={props.src} />
        </div>
    )
}

function Text(props) {
    return (
        <div className={props.class}>
            {props.name}
        </div>
    )
}

class StartProductReel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // winHeight: window.innerHeight,
            // body: document.body,
            // html: document.documentElement,
            // get docHeight() {
            //     return Math.max(this.body.scrollHeight, this.body.offsetHeight, this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight)
            // },
            // get max() {
            //     return this.docHeight - this.winHeight
            // },
            currentItem: 0,
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

    timeline = Anime.timeline({
        autoplay: false,
        loop: true,
        duration: 1000,
        direction: 'alternate'
    })
    position = 0

    registerAnimation = settings => {
        settings.forEach(setting => this.timeline.add(setting))
    }

    handleFlickUp = (e, deltaY, isFlick) => {
        console.log(deltaY);
        this.timeline.play()
        this.timeline.run = anim => {
            const progress = Math.round(this.timeline.progress);
            if (progress === 50) {
                anim.pause()
            }
            if (progress === 100) {
                anim.pause()
                this.setState(prevState => ({currentItem: prevState.currentItem + 1}));
            }
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Swipeable className={'StartProductReel'} onSwipedUp={this.handleFlickUp}>
                <Animation registerAnimation={this.registerAnimation}>
                    <Image
                        src={this.state.items[this.state.currentItem].src}
                        class='image'
                        animation={{
                            translateX: [
                                '-100vw', '100vw'
                            ],
                            offset: 0,
                            easing: 'easeInOutSine'
                        }}
                    />
                    <Text
                        name={this.state.items[this.state.currentItem].name}
                        class={'imageText'}
                        animation={{
                            translateX: [
                                { value: '20vw', duration: 0 }
                            ],
                            translateY: [
                                { value: '10vh', duration: 0 }
                            ],
                            scale: [
                                { value: '0', duration: 0 },
                                { value: '1', duration: 500 },
                                { value: '0', duration: 500 }
                            ],
                            offset: 0,
                            easing: 'easeInOutSine'
                        }}
                    />
                </Animation>
            </Swipeable>
        );
    }
}

class Animation extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.registerAnimation(this.props.children.map(x => Object.assign({}, { targets: `.${x.props.class}` }, x.props.animation)))
    }

    render() {
        return this.props.children
    }
}


export default StartProductReel