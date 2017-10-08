import React from 'react';
import {wrapper, img, infoBox, name, divider, readMore, start, end, left, right} from './Item.scss';

const ItemSection = (props) => {
    let alignImg = props.reverse ? start : end
    let imgPos = props.reverse ? left : right
    let alignInfoBox = props.reverse ? end : start
    let infoBoxContent = [
        <h3 key='name' className={`${name}`}>{props.name}</h3>,
        <div key='divider' className={divider}></div>,
        <button key='readMore' className={`${readMore}`}>Read More</button>
    ]

    return (
        <div className={wrapper}>
            <div className={`${img} ${alignImg}`}>
                <img className={`${imgPos}`} src={props.src} />
            </div>
            <div className={`${infoBox} ${alignInfoBox}`}>
                {props.reverse ? infoBoxContent.reverse() : infoBoxContent}
            </div>
        </div>
    )
};

export default ItemSection;