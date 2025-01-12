import React, { useState } from 'react';
import cartList from '../../cartList';

const cartItems = (props) => {
    // to be called by cartItems, not to be exported
    // qtyChange and originalQty are entered separately to keep track of qtyChange for the price calculation
    function changeBookQty(bookId, originalQty, qtyChange){
        const cartContentIndex = cartList.findIndex(item => item.id === bookId);
        const newQuantity = originalQty + qtyChange;
        const bookPrice = cartList[cartContentIndex].price;
        if(newQuantity===0){
            // remove item from cart
            cartList = cartList.filter(item => item.id !== book.id);
        }
        else{
            // update quantity
            cartList[cartContentIndex].quantity = newQuantity;
        }

        // Important: This line below will cause the rerendering of the cartList component 
        // hence this component does not need to be manually rerendered via use state
        props.updateFinalPrice(bookPrice, qtyChange);
    }
    return(
        <div className='Item'>
            <img src={props.image} />
            <div className='right-sidebar'>
                <h1 className="title">{props.title}</h1>
                <p className="info genre">Genre: {props.genre}</p>
                <p className="info category">Category: {props.category}</p>
                <p className="info price">Price: {props.totalPrice}</p>
                <p className="info language">Language: {props.language}</p>
                <p className="info stock">Stock left: {props.stock}</p>
                <div className="change-quantity">
                    <button className="changeQty addBook" onClick={() => changeBookQty(props.id, props.quantity, 1)}>+</button>
                    <p className="info quantity">{props.purchaseUnit} copies in cart</p>
                    <button className="changeQty removeBook" onClick={() => changeBookQty(props.id, props.quantity, -1)}>-</button>
                </div>
            </div>
        </div>
    );
}
export default cartItems;