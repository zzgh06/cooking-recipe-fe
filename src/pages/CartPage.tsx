import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCart } from "../hooks/Cart/useFetchCart";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../redux/cartSlice";
import { RootState } from "../redux/store";
import { CartItemType } from "../types";
import CartItem from "../component/Cart/CartItem";
import OrderReceipt from "../component/OrderReceipt/OrderReceipt";
import CartPageSkeleton from "../component/Skeleton/CartPageSkeleton";

interface CartState {
  cartItem: CartItemType[];
  selectedItems: string[];
}

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: cartItems, isLoading, refetch} = useFetchCart();
  const { cartItem, selectedItems } = useSelector<RootState, CartState>((state: RootState) => state.cart);

  useEffect(() => {
    if (cartItems) {
      dispatch(setCartItems(cartItems));
      refetch();
    }
  }, [cartItems, dispatch]);
 
  const selectedCartItems = cartItem.filter((item) =>
    item.ingredientId && selectedItems.includes(item.ingredientId._id)
  );

  const totalPrice = selectedCartItems.reduce(
    (total, item) => total + (item.ingredientId?.price ?? 0) * item.qty,
    0
  );

  if (isLoading) {
    return (
      <CartPageSkeleton />
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-3xl text-center font-semibold">장바구니</h2>
      <div className="flex justify-center flex-wrap xs:px-[20px] md:px-[40px] lg:px-[180px]">
        {!cartItem || cartItem.length === 0 ? (
          <div className="text-center w-3/5 p-8 flex flex-col items-center justify-center min-h-[300px] border border-gray-300 rounded-lg">
          <div className="text-gray-400 mb-4" style={{ fontSize: 80 }}>🛒</div>
          <h3 className="text-2xl mb-4">장바구니가 비어 있습니다.</h3>
          <p className="text-lg mb-6">현재 장바구니에 담긴 아이템이 없습니다. 새로운 상품을 추가해보세요!</p>
          <button
            className="bg-blue-500 text-white w-4/5 py-2 rounded"
            onClick={() => navigate("/store")}
          >
            쇼핑하러 가기
          </button>
        </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-center">
            <div className="col-span-3">
              {cartItem.map((item) => 
                item.ingredientId && (
                  <CartItem
                    key={item.ingredientId._id}
                    item={item.ingredientId}
                    qty={item.qty}
                    selectedItems={selectedItems}
                  />
                )
              )}
            </div>
            <div className="col-span-2">
                <OrderReceipt
                  selectedCartItems={selectedCartItems}
                  totalPrice={totalPrice}
                />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default CartPage;
