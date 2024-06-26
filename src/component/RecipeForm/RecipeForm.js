import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import CategorySelect from '../CategorySelect/CategorySelect';
import CloudinaryUploadWidget from '../../utils/CloudinaryUploadWidget';
import { foodCategory, moodCategory, methodCategory, ingredientCategory, etcCategory, servings, difficulty, time } from '../../constants/recipe.constants';
import './RecipeForm.style.css';

const initialFormData = {
  name: '',
  description: '',
  image: [],
  foodCategory: '',
  moodCategory: '',
  methodCategory: '',
  ingredientCategory: '',
  etcCategory: '',
  servings: '',
  time: '',
  difficulty: '',
  ingredients: [{ name: '', qty: '', unit: '' }],
  steps: [{ description: '', image: null }]
};

const RecipeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', qty: '', unit: '' }]
    });
  };

  const handleAddStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { description: '', image: null }]
    });
  };

  const handleChange = (index, field, value, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index][field] = value;
    setFormData({
      ...formData,
      [type]: updatedArray
    });
  };

  const uploadMainImage = (url) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      image: [...prevFormData.image, url]
    }));
  };

  const uploadStepImage = (url, type, index) => {
    if (type === 'steps') {
      const updatedSteps = [...formData.steps];
      updatedSteps[index].image = url;
      setFormData(prevFormData => ({
        ...prevFormData,
        steps: updatedSteps
      }));
    }
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = formData.steps.filter((_, i) => i !== index);
    setFormData({ ...formData, steps: updatedSteps });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, description, image, foodCategory, moodCategory, methodCategory, ingredientCategory, etcCategory, servings, time, difficulty, ingredients, steps } = formData;

    const recipeData = {
      name,
      description,
      ingredients,
      steps,
      categories: {
        foodCategory,
        moodCategory,
        methodCategory,
        ingredientCategory,
        etcCategory: etcCategory.split(',')
      },
      servings,
      time,
      difficulty,
      images: image
    };

    console.log('recipeData to be submitted:', recipeData);

    onSubmit(recipeData);
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
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="image">
        <Form.Label>레시피 이미지</Form.Label>
        <CloudinaryUploadWidget uploadImage={uploadMainImage} type="main" index={null} />
        {formData.image.length > 0 && formData.image.map((img, idx) => (
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
            onChange={(e) => setFormData({ ...formData, foodCategory: e.target.value })}
          />
        </Col>
        <Col>
          <CategorySelect
            label="상황"
            options={moodCategory}
            value={formData.moodCategory}
            onChange={(e) => setFormData({ ...formData, moodCategory: e.target.value })}
          />
        </Col>
        <Col>
          <CategorySelect
            label="방법"
            options={methodCategory}
            value={formData.methodCategory}
            onChange={(e) => setFormData({ ...formData, methodCategory: e.target.value })}
          />
        </Col>
        <Col>
          <CategorySelect
            label="재료"
            options={ingredientCategory}
            value={formData.ingredientCategory}
            onChange={(e) => setFormData({ ...formData, ingredientCategory: e.target.value })}
          />
        </Col>
        <Col>
          <CategorySelect
            label="기타"
            options={etcCategory}
            value={formData.etcCategory}
            onChange={(e) => setFormData({ ...formData, etcCategory: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
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
              value={ingredient.name}
              onChange={(e) => handleChange(index, 'name', e.target.value, 'ingredients')}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="양"
              value={ingredient.qty}
              onChange={(e) => handleChange(index, 'qty', e.target.value, 'ingredients')}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="단위"
              value={ingredient.unit}
              onChange={(e) => handleChange(index, 'unit', e.target.value, 'ingredients')}
            />
          </Col>
          <Col>
            <Button variant="danger" onClick={() => handleDeleteIngredient(index)}>삭제</Button>
          </Col>
        </Row>
      ))}
      <Button className="btn-green" onClick={handleAddIngredient}>재료 추가</Button>

      <h2>요리 순서</h2>
      {formData.steps.map((step, index) => (
        <Row key={index} className="align-items-center">
          <Col>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="요리 설명"
              value={step.description}
              onChange={(e) => handleChange(index, 'description', e.target.value, 'steps')}
            />
          </Col>
          <Col>
            <CloudinaryUploadWidget uploadImage={uploadStepImage} type="steps" index={index} />
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
            <Button variant="danger" onClick={() => handleDeleteStep(index)}>삭제</Button>
          </Col>
        </Row>
      ))}
      <Button className="btn-green" onClick={handleAddStep}>요리 순서 추가</Button>
      <Button type="submit" className="btn-green mt-3">레시피 제출</Button>
    </Form>
  );
};

export default RecipeForm;
