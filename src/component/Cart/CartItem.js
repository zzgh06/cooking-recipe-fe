import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCartItem } from '../../redux/cartSlice';
import { deleteCartItem } from '../../redux/cartSlice';
import { currencyFormat } from '../../utils/number';

const CartItem = ({ingredientId, qty}) => {
    const {name, price, unit, image, _id} = ingredientId;
    console.log("_id", _id);
    const cartItem = useSelector((state) => state.cart.cartItem);
    const dispatch = useDispatch();

    const handleQtyChange = (event, id) => {
        dispatch(editCartItem({ingredientId: id, qty:event.target.value}));
    };

    const deleteItem = () =>{
        dispatch(deleteCartItem({ingredientId: _id}));
    }

    return(
        <div className="cart-item-box">
            <div className="cart-item">
                <img
                    className="cart-item-image" 
                    src={image}
                    alt={name}
                />
                <div className="cart-item-description-box">
                    <p className="cart-item-name">{name}</p>
                    <p>{unit}</p>
                    <p>갯수</p>
                    <select value={`${qty}`} onChange={(event) => handleQtyChange(event, _id)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select> 
                    <p className="cart-item-price">₩ {currencyFormat(price * qty)}</p>
                </div>

            </div>
            <div>
                <button className="cart-item-delete-button" onClick={deleteItem}>삭제</button>
            </div>
        </div>
    );
};

export default CartItem;