import React, { Component } from 'react'
import './Product.scss'

class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false
        }
    }

    actualCost = x => x / 100

    toggleModal = e => this.setState(prevState => ({showModal: !prevState.showModal}))

    render() {
        const {id, name, image, price} = this.props;
        return (
            <div className='product'>
                <div className='product__image'>
                    <img src={image} />
                </div>
                <div className='product__info'>
                    <div className='product__name'>{name}</div>
                    <div className='product__price'>{`${this.actualCost(price)} SEK`}</div>
                    <div className='product__info-row'>
                        <div className='product__more' onClick={this.toggleModal}>Read more</div>
                        <div className='product__buy' onClick={this.props.addMe}>Buy</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product