import React, { Component } from 'react'
import './StartProductReel.scss'
import Anime from 'animejs'

function Image(props) {
    return (
        <div className='StartProductReel__image'>
            <img src={props.src} />
        </div>
    )
}

function Text(props) {
    return (
        <div className='StartProductReel__text'>
            <div className='StartProductReel__name'>
                {props.name}
            </div>
            <div className='StartProductReel__divider'>
                
            </div>
            <div className='StartProductReel__action'>

            </div>
        </div>
    )
}

class StartProductReel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageAnimation: null,
            textAnimation: null,
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

    componentDidMount() {
        this.setState({
            imageAnimation: Anime({
                targets: '.StartProductReel__image',
                translateX: [
                    {value: '-20vw', duration:0},
                    {value: '+=40vw', duration: 1000}
                ],
                translateY: [
                    {value: '+80vh', duration:0},
                    {value: '-=40vh', duration:1000}
                ],
                scale: '+=0.1',
                duration: 1000,
                autoplay: false,
                easing: 'easeInOutSine'
            }),
            textAnimation: Anime({
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
        })
    }

    render() {
        if (this.state.imageAnimation !== null && this.state.textAnimation !== null) {
            this.state.imageAnimation.seek(this.state.imageAnimation.duration * (this.props.scrollPercent / 100))
            this.state.textAnimation.seek(this.state.textAnimation.duration * (this.props.scrollPercent / 100))
        }

        return (
            <div className='StartProductReel'>
                <Image src={this.state.items[0].src}/>
                <Text name={this.state.items[0].name}/>
            </div>
        )
    }
}

export default StartProductReel