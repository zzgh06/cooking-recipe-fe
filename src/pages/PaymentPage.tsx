import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cc_expires_format } from "../utils/number";
import { useDeleteSelectedCartItems } from "../hooks/Cart/useDeleteSelectedCartItems"; 
import { useCreateOrder } from "../hooks/Order/useCreateOrder";
import { RootState } from "../redux/store";
import { Ingredient } from "../types";
import PaymentForm from "../component/PaymentForm/PaymentForm";
import OrderReceipt from "../component/OrderReceipt/OrderReceipt";

interface CardValue {
  cvc: string;
  expiry: string;
  name: string;
  number: string;
  focus: 'number' | 'name' | 'expiry' | 'cvc' | undefined;
}

interface ShipInfo {
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
  city: string;
  zip: string;
}

interface CartItemType {
  ingredientId: Ingredient;
  qty: number;
}

interface CartState {
  cartItem: CartItemType[];
  selectedItems: string[];
}

const PaymentPage = () => {
  const { cartItem, selectedItems } = useSelector<RootState, CartState>((state: RootState) => state.cart);
  const navigate = useNavigate();
  const [cardValue, setCardValue] = useState<CardValue>({
    cvc: "",
    expiry: "",
    focus: undefined, 
    name: "",
    number: "",
  });
  const [shipInfo, setShipInfo] = useState<ShipInfo>({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });

  const { mutate: deleteSelectedItems, isPending: isDeleting } = useDeleteSelectedCartItems();
  const { mutate: createOrder, isPending: isOrdering, isSuccess } = useCreateOrder();

  const selectedCartItems = cartItem?.filter((item) =>
    selectedItems.includes(item.ingredientId._id)
  );

  const totalPrice = selectedCartItems.reduce(
    (total, item) => total + item.ingredientId.price * item.qty,
    0
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, lastName, contact, address, city, zip } = shipInfo;
    const data = {
      totalPrice: totalPrice,
      contactInfo: {
        shipTo: { address, city, zip },
        contact: { firstName, lastName, contact },
      },
      items: selectedItems.map((id) => {
        const item = cartItem.find((item) => item?.ingredientId._id === id);
        return {
          ingredientId: id,
          price: item?.ingredientId.price,
          qty: item?.qty,
        };
      }),
    };
    try {
      await deleteSelectedItems(); 
      createOrder(data);
    } catch (error) {
      console.error("Failed to delete cart items:", error);
    }
  };
  

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setShipInfo({ ...shipInfo, [name]: value });
  };

  const handlePaymentInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "expiry") {
      let newValue = cc_expires_format(value);
      setCardValue({ ...cardValue, [name]: newValue });
      return;
    }
    setCardValue({ ...cardValue, [name]: value });
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const validFocusFields: Array<'number' | 'cvc' | 'expiry' | 'name'> = [
      'number', 'cvc', 'expiry', 'name'
    ];
  
    if (validFocusFields.includes(e.target.name as 'number' | 'cvc' | 'expiry' | 'name')) {
      setCardValue({ ...cardValue, focus: e.target.name as 'number' | 'cvc' | 'expiry' | 'name' });
    }
  };
  

  useEffect(() => {
    if (cartItem.length === 0) {
      navigate("/cart");
    }
  }, [cartItem.length, navigate]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/payment/success");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="container mx-auto px-[30px] md:px-[100px] my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        <div className="lg:col-span-7">
          <div>
            <h2 className="text-2xl font-bold mb-6">배송 주소</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="성 *"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={handleFormChange}
                    required
                    name="lastName"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="이름 *"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={handleFormChange}
                    required
                    name="firstName"
                  />
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="연락처 *"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={handleFormChange}
                    required
                    name="contact"
                  />
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="주소 *"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={handleFormChange}
                    required
                    name="address"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City *"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={handleFormChange}
                    required
                    name="city"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Zip *"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={handleFormChange}
                    required
                    name="zip"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">결제 정보</h2>
                <PaymentForm
                  cardValue={cardValue}
                  handleInputFocus={handleInputFocus}
                  handlePaymentInfoChange={handlePaymentInfoChange}
                />
              </div>

              <button
                type="submit"
                disabled={isDeleting || isOrdering}
                className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-medium 
                  hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400 
                  disabled:cursor-not-allowed"
              >
                결제하기
              </button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-5 block lg:block">
          <OrderReceipt
            selectedCartItems={selectedCartItems}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
