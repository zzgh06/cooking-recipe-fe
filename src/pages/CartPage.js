import React, { useState, useEffect } from "react";
import CartItem from "../component/Cart/CartItem";
import "../style/cartPage.style.css";
import { useDispatch, useSelector } from "react-redux";
import { getCart, calculateTotalPrice } from "../redux/cartSlice";
import OrderReceipt from "../component/OrderReceipt/OrderReceipt";

const CartPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItem = useSelector((state) => state.cart.cartItem);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user]);

  useEffect(() => {
    if (cartItem?.length > 0) {
      dispatch(calculateTotalPrice());
    }
  }, [cartItem]);

  return (
    <div className="cart-page-margin-bottom">
      <h2 className="cart-page-title">Cart</h2>
      <div className="cart-page-box">
        {!user || cartItem?.length === 0 ? (
          <div className="cart-none">
            <div className="empty-cart">장바구니가 비어 있습니다.</div>
            <OrderReceipt />
          </div>
        ) : (
          <>
            <div className="cart-page-width margin-right">
              {cartItem.map((item, index) => (
                <CartItem
                  key={item.ingredientId || index}
                  ingredientId={item.ingredientId}
                  qty={item.qty}
                />
              ))}
            </div>
            <div className="cart-page-width">
              {/* <OrderList totalPrice={totalPrice}/> */}
              <OrderReceipt cartItem={cartItem} totalPrice={totalPrice} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
