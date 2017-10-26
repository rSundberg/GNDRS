import React, { Component } from 'react'

class ProductInfo extends Component {
    actualCost = x => x / 100

    render() {
        const { name, price } = this.props;
        return (
            <div className="checkout__product-info-item">
                <h3 key={name}>{name}</h3>
                <span key={price}>
                    {`${this.actualCost(price)} SEK`}
                </span>
            </div>
        )
    }
}

export default ProductInfo;