import React, { Component } from 'react'
import Anime from 'animejs'
import './Product.scss'

class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showMore: false
        }
    }

    actualCost = x => x / 100

    toggleModal = e => {
        e.persist()

        this.setState(
            prevState => ({showMore: !prevState.showMore}),
            () => {
                if (this.state.showMore) {
                    Anime({
                        targets: e.target.parentNode.parentNode,
                        translateY: ['75vh', '10vh'],
                        height: [0, '80vh'],
                        elasticity: 0,
                        easing: 'easeInOutSine',
                        duration: 400
                    })
                    Anime({
                        targets: e.target.parentNode.nextElementSibling,
                        translateY: [0, '5vh'],
                        height: [0, '60vh'],
                        opacity: [0, 1],
                        elasticity: 0,
                        easing: 'easeInOutSine',
                        duration: 400
                    })
                } else {

                    Anime({
                        targets: e.target.parentNode.parentNode,
                        translateY: ['10vh', '75vh'],
                        height: ['80vh', 0],
                        elasticity: 0,
                        easing: 'easeInOutSine',
                        duration: 400
                    })

                    Anime({
                        targets: e.target.parentNode.nextElementSibling,
                        translateY: ['5vh', 0],
                        height: ['60vh', 0],
                        opacity: [1, 0],
                        elasticity: 0,
                        easing: 'easeInOutSine',
                        duration: 400
                    })
                }
            }
        )
    }

    render() {
        const {name, image, price} = this.props;
        const blur = this.state.showMore ? {filter: 'blur(5px)'} : {}

        return (
            <div className={`product`}>
                <div className='product__info'>
                    <div className='product__name'>{name}</div>
                    <div className='product__price'><span>799 SEK</span>{`${this.actualCost(price)} SEK`}</div>
                    <div className='product__info-row'>
                        <div className='product__more' onClick={this.toggleModal}>{this.state.showMore ? 'Less info' : 'More info'}</div>
                        <div className='product__buy' onClick={this.props.addMe}>Buy</div>
                    </div>
                    <div className='product__info-column'>
                        <div className='product__details'>
                            <div className='product__details-row'>
                                <h3>Size</h3>
                                <span>{this.props.details.size}</span>
                            </div>
                            <div className='product__details-row'>
                                <h3>Outer Material</h3>
                                <span>{this.props.details.material}</span>
                            </div>
                            <div className='product__details-row'>
                                <h3>Inner material</h3>
                                <span>{this.props.details.material__inner}</span>
                            </div>
                            <div className='product__details-row'>
                                <h3>Pockets</h3>
                                <span>{this.props.details.pockets}</span>
                            </div>
                            <div className='product__details-column'>
                                {this.props.details.description}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='product__image' style={blur}>
                    <img src={image} />
                </div>
            </div>
        );
    }
}

export default Product