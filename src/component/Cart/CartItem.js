import React from "react";

const CartItem = ({ingredientId, qty}) => {
    const {name, price, unit, image} = ingredientId;
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
                    <p>갯수</p>
                    <select value={`${qty}`}>
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
                    <p className="cart-item-price">₩ {price}</p>
                </div>

            </div>
            <div>
                <button className="cart-item-delete-button">삭제</button>
            </div>
        </div>
    );
};

export default CartItem;