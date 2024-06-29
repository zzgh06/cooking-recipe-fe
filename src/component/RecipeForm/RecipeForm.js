import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
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
import "./RecipeForm.style.css";

const RecipeForm = ({ onSubmit, initialData }) => {
  const initialFormData = {
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
    ingredients: [{ name: "", qty: "", unit: "" }],
    steps: [{ description: "", image: null }],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
        images: initialData.images || [],
        foodCategory: initialData.categories?.food || "",
        moodCategory: initialData.categories?.mood || "",
        methodCategory: initialData.categories?.method || "",
        ingredientCategory: initialData.categories?.ingredient || "",
        etcCategory: initialData.categories?.etc || "",
        ingredients:
          initialData.ingredients?.length > 0
            ? initialData.ingredients
            : [{ name: "", qty: "", unit: "" }],
        steps:
          initialData.steps?.length > 0
            ? initialData.steps
            : [{ description: "", image: null }],
      }));
    }
  }, [initialData]);

  const handleAddIngredient = () => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: "", qty: "", unit: "" }],
    }));
  };

  const handleAddStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      steps: [...prevData.steps, { description: "", image: null }],
    }));
  };

  const handleChange = (index, field, value, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setFormData((prevData) => ({
      ...prevData,
      [type]: updatedArray,
    }));
  };

  const uploadMainImage = (url) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, url],
    }));
  };

  const uploadStepImage = (url, type, index) => {
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

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      ingredients: updatedIngredients,
    }));
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = formData.steps.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      steps: updatedSteps,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
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

    const recipeData = {
      name,
      description,
      ingredients,
      steps,
      categories: {
        food: foodCategory,
        mood: moodCategory,
        method: methodCategory,
        ingredient: ingredientCategory,
        etc: etcCategory,
      },
      servings,
      time,
      difficulty,
      images,
    };

    //console.log('recipeData to be submitted:', recipeData);

    // Simulating form submission success
    onSubmit(recipeData);

    // Show submit modal
    setShowSubmitModal(true);
  };

  const handleCloseModal = () => {
    setShowSubmitModal(false);
    setFormData(initialFormData); // Reset form data when modal is closed
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>레시피 제목</Form.Label>
        <Form.Control
          type="text"
          placeholder="레시피 제목을 입력해 주세요"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>요리 소개</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="요리 소개를 입력해 주세요"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group controlId="images">
        <Form.Label>레시피 이미지</Form.Label>
        <CloudinaryUploadWidget
          uploadImage={uploadMainImage}
          type="main"
          index={null}
        />
        {formData.images.length > 0 &&
          formData.images.map((img, idx) => (
            <img
              key={idx}
              id={`uploadedimage_main_${idx}`}
              src={img}
              className="upload-image mt-2"
              alt="uploadedimage"
            />
          ))}
      </Form.Group>

      <Row>
        <Col>
          <CategorySelect
            label="음식 종류"
            options={foodCategory}
            value={formData.foodCategory}
            onChange={(e) =>
              setFormData({ ...formData, foodCategory: e.target.value })
            }
          />
        </Col>
        <Col>
          <CategorySelect
            label="상황"
            options={moodCategory}
            value={formData.moodCategory}
            onChange={(e) =>
              setFormData({ ...formData, moodCategory: e.target.value })
            }
          />
        </Col>
        <Col>
          <CategorySelect
            label="방법"
            options={methodCategory}
            value={formData.methodCategory}
            onChange={(e) =>
              setFormData({ ...formData, methodCategory: e.target.value })
            }
          />
        </Col>
        <Col>
          <CategorySelect
            label="재료"
            options={ingredientCategory}
            value={formData.ingredientCategory}
            onChange={(e) =>
              setFormData({ ...formData, ingredientCategory: e.target.value })
            }
          />
        </Col>
        <Col>
          <CategorySelect
            label="기타"
            options={etcCategory}
            value={formData.etcCategory}
            onChange={(e) =>
              setFormData({ ...formData, etcCategory: e.target.value })
            }
          />
        </Col>
      </Row>

      <h2>요리 정보</h2>
      <Row>
        <Col>
          <CategorySelect
            label="인원"
            options={servings}
            value={formData.servings}
            onChange={(e) =>
              setFormData({ ...formData, servings: e.target.value })
            }
          />
        </Col>
        <Col>
          <CategorySelect
            label="시간"
            options={time}
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </Col>
        <Col>
          <CategorySelect
            label="난이도"
            options={difficulty}
            value={formData.difficulty}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: e.target.value })
            }
          />
        </Col>
      </Row>

      <h2>재료 정보</h2>
      {formData.ingredients.map((ingredient, index) => (
        <Row key={index} className="align-items-center">
          <Col>
            <Form.Control
              type="text"
              placeholder="재료명"
              value={ingredient.name || ""}
              onChange={(e) =>
                handleChange(index, "name", e.target.value, "ingredients")
              }
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="양"
              value={ingredient.qty || ""}
              onChange={(e) =>
                handleChange(index, "qty", e.target.value, "ingredients")
              }
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="단위"
              value={ingredient.unit || ""}
              onChange={(e) =>
                handleChange(index, "unit", e.target.value, "ingredients")
              }
            />
          </Col>
          <Col>
            <Button
              variant="danger"
              onClick={() => handleDeleteIngredient(index)}
            >
              삭제
            </Button>
          </Col>
        </Row>
      ))}
      <Button className="btn-green" onClick={handleAddIngredient}>
        재료 추가
      </Button>

      <h2>요리 순서</h2>
      {formData.steps.map((step, index) => (
        <Row key={index} className="align-items-center">
          <Col>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="요리 설명"
              value={step.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value, "steps")
              }
            />
          </Col>
          <Col>
            <CloudinaryUploadWidget
              uploadImage={(url) => uploadStepImage(url, "steps", index)}
              type="steps"
              index={index}
            />
            {step.image && (
              <img
                id={`uploadedimage_steps_${index}`}
                src={step.image}
                className="upload-image mt-2"
                alt="uploadedimage"
              />
            )}
          </Col>
          <Col>
            <Button variant="danger" onClick={() => handleDeleteStep(index)}>
              삭제
            </Button>
          </Col>
        </Row>
      ))}
      <Button className="btn-green" onClick={handleAddStep}>
        요리 순서 추가
      </Button>
      <Button type="submit" className="btn-green mt-3">
        레시피 제출
      </Button>

      <Modal show={showSubmitModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>레시피 제출 완료</Modal.Title>
        </Modal.Header>
        <Modal.Body>레시피 제출이 완료되었습니다.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default RecipeForm;
