import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
import { CATEGORY, STATUS } from "../../constants/ingredient.constants";
import { useCreateIngredient } from "../../hooks/Ingredient/useCreateIngredient";
import { useEditIngredient } from "../../hooks/Ingredient/useEditIngredient";
import { Ingredient } from "../../types";

interface NewItemDialogProps {
  mode: "new" | "edit";
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  selectedIngredient: Ingredient | null;
}

const InitialFormData: Ingredient = {
  _id: "",
  name: "",
  stock: 0,
  images: [],
  description: "",
  category: [],
  status: "active",
  price: 0,
  discountPrice: 0,
  reviewCnt: 0,
  unit: "",
  qty: 0,
  totalSales: 0,
};

const NewItemDialog = ({
  mode,
  showDialog,
  setShowDialog,
  selectedIngredient,
}: NewItemDialogProps) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Ingredient>(InitialFormData);
  const [stockError, setStockError] = useState<boolean>(false);
  const { mutate: createIngredient } = useCreateIngredient();
  const { mutate: editIngredient } = useEditIngredient();

  const handleClose = () => {
    setFormData({ ...InitialFormData });
    setStockError(false);
    setShowDialog(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.stock === 0) return setStockError(true);

    if (mode === "new") {
      createIngredient(formData);
    } else {
      editIngredient({
        id: selectedIngredient?._id || "",
        ingredient: formData,
      });
    }
    setShowDialog(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData({ ...formData, stock: value ? parseInt(value, 10) : 0 });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, category: selectedOptions });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFormData({ ...formData, status: value });
  };

  const uploadImage = (url: string) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, url],
    }));
  };

  useEffect(() => {
    if (showDialog) {
      if (mode === "edit" && selectedIngredient) {
        setFormData(selectedIngredient);
      } else {
        setFormData({ ...InitialFormData });
      }
    }
  }, [showDialog, mode, selectedIngredient]);

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${showDialog ? "block" : "hidden"
        }`}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-h-[650px] overflow-y-auto max-w-3xl p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {mode === "new" ? "새로운 재료(상품) 등록" : "재료(상품) 수정"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="재료(상품)명 *"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleStockChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                {stockError && (
                  <p className="text-red-600 text-sm mt-1">
                    Please enter stock
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, description: event.target.value })
                  } className="w-full px-3 py-2 border border-gray-300 rounded"
                  rows={3}
                  placeholder="재료(상품)에 대한 설명을 작성해주세요 *"
                  required
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Category</label>
                <select
                  id="category"
                  multiple
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  {CATEGORY.map((item, idx) => (
                    <option key={idx} value={item.toLowerCase()}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Status</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleStatusChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  {STATUS.map((item, idx) => (
                    <option key={idx} value={item.toLowerCase()}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <CloudinaryUploadWidget uploadImage={uploadImage} />
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {formData.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`uploaded_image_${idx}`}
                        className="w-full h-auto rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Discount %</label>
                <input
                  id="discountPrice"
                  type="number"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Review Count</label>
                <input
                  id="reviewCnt"
                  type="number"
                  value={formData.reviewCnt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {mode === "new" ? "제출" : "수정"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewItemDialog;
