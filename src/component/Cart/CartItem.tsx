import React from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteCartItem } from "../../hooks/Cart/useDeleteCartItem";
import { useEditCartItem } from "../../hooks/Cart/useEditCartItem";
import { currencyFormat } from "../../utils/number";
import { AppDispatch } from "../../redux/store";
import { toggleSelectItem } from "../../redux/cartSlice";

interface CartItemProps {
  item: {
    name: string;
    price?: number;
    unit?: string;
    images: string[];
    _id: string;
  }
  qty: number;
  selectedItems: string[];
}

const CartItem = ({ item, qty, selectedItems }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const isSelected = item._id ? selectedItems.includes(item._id) : false;
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteCartItem();
  const { mutate: editCartItem } = useEditCartItem();

  const handleSelectChange = () => {
    if (item._id) {
      dispatch(toggleSelectItem(item._id));
    }
  };

  const handleQtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && item._id) {
      editCartItem({ ingredientId: item._id, qty: value });
    }
  };

  const handleDelete = () => {
    if (item._id) {
      deleteItem({ ingredientId: item._id });
    }
  };

  const optimizedImageUrl = (url: string) =>
    url.replace(/\/upload\//, "/upload/c_fill,h_200,w_200,f_webp/");

  const quantityOptions: number[] = Array.from(Array(10).keys()).map(n => n + 1);

  return (
    <div className="flex mb-2 px-[12px] py-[15px] border border-light-gray shadow-none rounded">
      <div className="flex items-center flex-1 gap-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelectChange}
          className="w-5 h-5 accent-green-600 text-[15px] cursor-pointer"
        />
        <img
          src={item.images.length > 0 ? optimizedImageUrl(item.images[0]) : "path/to/default/image.jpg"}
          alt={item.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div className="flex-1">
          <h6 className="font-semibold text-[19px]">{item.name}</h6>
          <p className="text-gray-500 text-[20px]">{item.unit}</p>
          <h6 className="mt-1">₩ {currencyFormat((item.price || 0) * qty)}</h6>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 ml-2">
        <p className="text-gray-500">갯수</p>
        <select
          value={qty}
          onChange={handleQtyChange}
          className="text-center min-w-[65px] h-[60px] border border-gray-300 rounded"
        >
          {quantityOptions.map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <button
        aria-label="delete"
        className="mx-3 w-6 disabled:opacity-50"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <span className="text-[20px]">🗑️</span>
      </button>
    </div>
  );
};

export default CartItem;
