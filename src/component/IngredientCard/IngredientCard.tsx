import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCart } from "../../hooks/Cart/useAddToCart";
import { currencyFormat } from "../../utils/number";
import { RootState } from "../../redux/store";
import { setToastMessage } from "../../redux/commonUISlice";

interface IngredientCardProps {
  item: {
    _id: string;
    name: string;
    images: string[];
    price: number;
    discountPrice?: number;
  };
}

const IngredientCard = ({ item }: IngredientCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);
  const { mutate: addToCart } = useAddToCart();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const showIngredient = (id: string) => {
    navigate(`/ingredients/${id}`);
  };

  const calculateDiscountedPrice = (price: number, discountRate: number = 0): number => {
    const discountedPrice = price * (1 - discountRate / 100);
    return Math.floor(discountedPrice);
  };

  const handleQtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQty(Number(event.target.value));
  };

  const addCart = () => {
    if (!user) {
      navigate("/login");
      dispatch(setToastMessage({
        message: "로그인이 필요한 서비스 입니다.",
        status: "error",
      }))
      return;
    }

    addToCart({ ingredientId: item._id, qty });
    handleClose();
  };

  const optimizeImageUrl = (url: string): string => {
    return url.replace(/\/upload\//, '/upload/c_fill,h_538,w_538,f_auto,q_auto,f_webp/');
  };

  return (
    <>
      <div className="relative mb-2 w-full p-4 transition-all duration-500 shadow-none">
        <img
          src={optimizeImageUrl(item.images[0])}
          alt={item.name}
          className="w-full h-80 mb-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => showIngredient(item._id)}
        />
        <button
          className="flex items-center justify-center w-full py-2 border border-gray-300 rounded hover:bg-gray-100 text-blue-700"
          onClick={handleOpen}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="ml-2">담기</span>
        </button>
        <div className="mt-2">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <div>
            {item.discountPrice ? (
              <>
                <span className="text-sm line-through text-gray-400">{item.price}원</span>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-red-600">{item.discountPrice}%</span>
                  <span className="text-lg font-semibold text-black ml-2">
                    {currencyFormat(calculateDiscountedPrice(item.price, item.discountPrice))}원
                  </span>
                </div>
              </>
            ) : (
              <span className="text-lg font-semibold">{currencyFormat(item.price)}원</span>
            )}
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>
          <div className="bg-white rounded-lg shadow-lg p-4 z-10 w-11/12 sm:w-80 max-w-lg">
            <img
              src={optimizeImageUrl(item.images[0])}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-4" // 이미지의 크기 조정
              loading="lazy"
            />
            <div className="grid grid-cols-1 gap-2">
              <div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
              </div>
              <div className="flex items-center">
                {item.discountPrice ? (
                  <div className="flex items-center">
                    <span className="text-lg font-semibold">{calculateDiscountedPrice(item.price, item.discountPrice)}원</span>
                    <span className="text-sm line-through text-gray-400 ml-2">{item.price}원</span>
                  </div>
                ) : (
                  <span className="text-lg font-semibold">{item.price}원</span>
                )}
              </div>
              <div>
                <label className="block mb-1">수량</label>
                <select
                  value={qty}
                  onChange={handleQtyChange}
                  className="w-full border border-gray-300 rounded p-1"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">합계</span>
                <span className="font-semibold">
                  {calculateDiscountedPrice(item.price, item.discountPrice) * qty}원
                </span>
              </div>
              <div className="flex justify-between mt-4 gap-1">
                <button
                  className="w-full p-2 border border-gray-300 rounded hover:bg-gray-200"
                  onClick={handleClose}
                >
                  취소
                </button>
                <button
                  className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600"
                  onClick={addCart}
                >
                  담기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IngredientCard;