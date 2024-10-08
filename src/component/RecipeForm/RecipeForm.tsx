import React, { useState, useEffect } from "react";
import CategorySelect from "../CategorySelect/CategorySelect";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
import {
  foodCategory,
  moodCategory,
  methodCategory,
  ingredientCategory,
  etcCategory,
  servings,
  difficulty,
  time,
} from "../../constants/recipe.constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Ingredient, Recipe } from "../../types";

interface Step {
  description: string;
  image: string | null;
}

interface RecipeFormProps {
  onSubmit: (data: Recipe) => void;
  initialData?: Recipe;
}

const RecipeForm = ({ onSubmit, initialData }: RecipeFormProps) => {
  const initialFormData: Recipe = {
    _id: "",
    name: "",
    description: "",
    images: [],
    foodCategory: "",
    moodCategory: "",
    methodCategory: "",
    ingredientCategory: "",
    etcCategory: "",
    servings: "",
    time: "",
    difficulty: "",
    ingredients: [{ name: "", qty: 0, unit: "" }],
    steps: [{ description: "", image: null }],
  };

  const [formData, setFormData] = useState<Recipe>(initialFormData);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
        images: initialData.images || [],
        foodCategory: initialData.foodCategory || "",
        moodCategory: initialData.moodCategory || "",
        methodCategory: initialData.methodCategory || "",
        ingredientCategory: initialData.ingredientCategory || "",
        etcCategory: initialData.etcCategory || "",
        ingredients: initialData.ingredients || [{ name: "", qty: 0, unit: "" }],
        steps: initialData.steps || [{ description: "", image: null }],
      }));
    }
  }, [initialData]);

  const handleAddIngredient = () => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: "", qty: 0, unit: "" }],
    }));
  };

  const handleAddStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      steps: [...prevData.steps, { description: "", image: null }],
    }));
  };

  const handleChange = (index: number, field: keyof Ingredient | keyof Step, value: string, type: "ingredients" | "steps") => {
    const updatedArray = [...formData[type]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setFormData((prevData) => ({
      ...prevData,
      [type]: updatedArray,
    }));
  };

  const uploadMainImage = (url: string) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, url],
    }));
  };

  const uploadStepImage = (url: string, type: "steps", index: number) => {
    if (type === "steps") {
      setFormData((prevData) => {
        const updatedSteps = [...prevData.steps];
        updatedSteps[index] = {
          ...updatedSteps[index],
          image: url,
        };
        return {
          ...prevData,
          steps: updatedSteps,
        };
      });
    }
  };

  const handleDeleteIngredient = (index: number) => {
    const updatedIngredients = formData.ingredients.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      ingredients: updatedIngredients,
    }));
  };

  const handleDeleteStep = (index: number) => {
    const updatedSteps = formData.steps.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      steps: updatedSteps,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      _id,
      name,
      description,
      images,
      foodCategory,
      moodCategory,
      methodCategory,
      ingredientCategory,
      etcCategory,
      servings,
      time,
      difficulty,
      ingredients,
      steps,
    } = formData;

    const recipeData: Recipe = {
      _id: _id || "",
      name,
      description,
      images,
      foodCategory,
      moodCategory,
      methodCategory,
      ingredientCategory,
      etcCategory,
      servings,
      time,
      difficulty,
      ingredients,
      steps,
      categories: {
        food: foodCategory,
        mood: moodCategory,
        method: methodCategory,
        ingredient: ingredientCategory,
        etc: etcCategory,
      },
    };

    onSubmit(recipeData);
    setShowSubmitModal(true);
  };



  const handleCloseModal = () => {
    setShowSubmitModal(false);
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg">
      <div className="flex justify-start items-baseline border-b-4 border-black p-2.5">
        <h2 className="text-2xl font-bold">레시피 제목</h2>
      </div>
      <input
        className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="레시피 제목"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <div className="flex justify-start items-baseline border-b-4 border-black p-2.5 mt-6">
        <h2 className="text-2xl font-bold">요리 소개</h2>
      </div>
      <textarea
        className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows={6}
        placeholder="요리 소개"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <div className="mb-8">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex justify-start items-baseline border-b-4 border-black p-2.5 w-full">
            <h2 className="text-2xl font-bold">레시피 이미지</h2>
          </div>
          <CloudinaryUploadWidget
            uploadImage={uploadMainImage}
            type="main"
            index={null}
          />
        </div>
        {formData.images.length > 0 ? (
          formData.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              className="max-w-full h-auto mt-2.5 rounded-lg"
              alt="업로드된 이미지"
            />
          ))
        ) : (
          <div className="flex flex-col items-center w-full bg-gray-50 p-20 mx-auto border border-gray-300 rounded-2xl">
            <FontAwesomeIcon icon={faImage} className="text-5xl" />
            <h3 className="text-xl font-bold mt-2.5">
              요리 대표 사진을 등록해주세요.
            </h3>
            <p className="text-gray-600">
              음식사진 외 사람/동물 등의 사진은 삼가해주세요.
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-start items-baseline border-b-4 border-black p-2.5 mb-4">
        <h2 className="text-2xl font-bold">요리 정보</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "음식 종류", options: foodCategory, value: formData.foodCategory, field: "foodCategory" },
          { label: "상황", options: moodCategory, value: formData.moodCategory, field: "moodCategory" },
          { label: "방법", options: methodCategory, value: formData.methodCategory, field: "methodCategory" },
          { label: "재료", options: ingredientCategory, value: formData.ingredientCategory, field: "ingredientCategory" },
          { label: "기타", options: etcCategory, value: formData.etcCategory, field: "etcCategory" },
          { label: "인원", options: servings, value: formData.servings, field: "servings" },
          { label: "시간", options: time, value: formData.time, field: "time" },
          { label: "난이도", options: difficulty, value: formData.difficulty, field: "difficulty" },
        ].map(({ label, options, value, field }) => (
          <CategorySelect
            key={label}
            label={label}
            options={options}
            value={value}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          />
        ))}
      </div>
      <div className="mt-6">
        <div className="flex justify-start items-baseline border-b-4 border-black p-2.5">
          <h2 className="text-2xl font-bold">재료 정보</h2>
        </div>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-4">
              <input
                className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="재료명"
                value={ingredient.name}
                onChange={(e) => handleChange(index, "name", e.target.value, "ingredients")}
              />
            </div>
            <div className="sm:col-span-3">
              <input
                className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="양"
                value={ingredient.qty}
                onChange={(e) => handleChange(index, "qty", e.target.value, "ingredients")}
              />
            </div>
            <div className="sm:col-span-3">
              <input
                className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="단위"
                value={ingredient.unit}
                onChange={(e) => handleChange(index, "unit", e.target.value, "ingredients")}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="button"
                className="w-full h-12 mt-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-200 ease-in-out flex items-center justify-center"
                onClick={() => handleDeleteIngredient(index)}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                삭제
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
          onClick={handleAddIngredient}
        >
          <FontAwesomeIcon icon={faPlus} />
          재료 추가
        </button>
      </div>
      <div className="mt-6">
        <div className="flex justify-start items-baseline border-b-4 border-black p-2.5">
          <h2 className="text-2xl font-bold">요리 순서</h2>
        </div>
        {formData.steps.map((step, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start mt-4">
            <div className="sm:col-span-8">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                rows={6}
                placeholder="요리 설명"
                value={step.description}
                onChange={(e) => handleChange(index, "description", e.target.value, "steps")}
              />
            </div>
            <div className="sm:col-span-4">
              <div className="flex gap-2">
                <CloudinaryUploadWidget
                  uploadImage={(url: string) => uploadStepImage(url, "steps", index)}
                  type="steps"
                  index={index}
                />
                <button
                  type="button"
                  className="w-[250px] h-auto py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-200 ease-in-out flex items-center justify-center"
                  onClick={() => handleDeleteIngredient(index)}
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  삭제
                </button>
              </div>
              {step.image && (
                <img
                  src={step.image}
                  className="max-w-full h-[100px] mt-2.5 rounded-lg"
                  alt="단계 이미지"
                />
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
          onClick={handleAddStep}
        >
          <FontAwesomeIcon icon={faPlus} />
          요리 순서 추가
        </button>
      </div>
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-64"
        >
          레시피 제출
        </button>
      </div>
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">레시피 제출 완료</h2>
            <p className="mb-6">레시피 제출이 완료되었습니다.</p>
            <button
              onClick={handleCloseModal}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default RecipeForm;
