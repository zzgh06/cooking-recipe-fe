import React, { useEffect } from "react";
import { useFetchShoppingList } from "../../hooks/ShoppingList/useFetchShoppingList";
import { useRemoveFromShoppingList } from "../../hooks/ShoppingList/useRemoveFromShoppingList";
import { useMoveToCompletedList } from "../../hooks/ShoppingList/useMoveToCompletedList";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingList } from "../../redux/shoppingListSlice";
import { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ShoppingListItem {
  _id: string;
  name: string;
}

const MyGroceryNote = () => {
  const dispatch = useDispatch();
  const { selectedShoppingList, completedShoppingList } = useSelector(
    (state: RootState) => state.shoppingList
  );
  const { data, isLoading, isError, error } = useFetchShoppingList();
  const removeFromShoppingListMutation = useRemoveFromShoppingList();
  const moveToCompletedListMutation = useMoveToCompletedList();

  useEffect(() => {
    if (data) {
      dispatch(setShoppingList(data));
    }
  }, [data]);

  const handleAddFromSelectedList = async (item: ShoppingListItem) => {
    try {
      await moveToCompletedListMutation.mutateAsync(item);
    } catch (error) {
      console.error("Failed to move item:", error);
    }
  };

  const handleRemoveFromShoppingList = async (itemId: string) => {
    try {
      await removeFromShoppingListMutation.mutateAsync(itemId);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <div className="flex items-baseline border-b-4 border-gray-800 pb-2">
          <h2 className="text-2xl font-bold">쇼핑</h2>
          <span className="ml-4 text-lg">장보기 메모</span>
        </div>
        {isError && (
          <p className="text-red-500 text-center mt-4">
            {error.message || "데이터를 가져오는 데 실패했습니다."}
          </p>
        )}
        <div className="flex flex-wrap -mx-2 pt-4">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <div className="mb-4 p-4 bg-white border border-gray-200 rounded shadow">
              <h3 className="text-xl mb-2">장보기 목록</h3>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                  <div className="animate-spin border-4 border-green-500 border-t-transparent rounded-full w-24 h-24"></div>
                </div>
              )}
              <ul>
                {selectedShoppingList?.length > 0 ? (
                  selectedShoppingList.map((item, index) => (
                    <li
                      key={`selected-${item._id}-${index}`}
                      className="flex items-center bg-gray-50 border-b border-gray-200 p-3"
                    >
                      <input
                        type="checkbox"
                        className="mr-4"
                        checked={completedShoppingList.some(
                          (i) => i._id === item._id
                        )}
                        onChange={() => handleAddFromSelectedList(item)}
                      />
                      <span className="flex-grow">{item.name}</span>
                      <button
                        className="text-red-600 hover:text-red-800 w-9 h-9"
                        onClick={() => handleRemoveFromShoppingList(item._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-center italic">
                    장보기 목록이 비어 있습니다.
                  </p>
                )}
              </ul>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <div className="mb-4 p-4 bg-white border border-gray-200 rounded shadow">
              <h3 className="text-xl mb-2">구매 완료 목록</h3>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                  <div className="animate-spin border-4 border-green-500 border-t-transparent rounded-full w-24 h-24"></div>                </div>
              )}
              <ul>
                {completedShoppingList?.length > 0 ? (
                  completedShoppingList.map((item, index) => (
                    <li
                      key={`completed-${item._id}-${index}`}
                      className="flex items-center bg-gray-50 border-b border-gray-200 p-3"
                    >
                      <span className="flex-grow line-through text-gray-500">
                        {item.name}
                      </span>
                      <button
                        className="text-red-600 hover:text-red-800 w-9 h-9"
                        onClick={() => handleRemoveFromShoppingList(item._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-center italic">
                    구매 완료 목록이 비어 있습니다.
                  </p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGroceryNote;
