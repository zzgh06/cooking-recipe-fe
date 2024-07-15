import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
import { createIngredient, editIngredient } from "../../redux/ingredientSlice";
import { CATEGORY, STATUS } from "../../constants/ingredient.constants";
import "../../style/adminIngredient.style.css";

const InitialFormData = {
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
};

const NewItemDialog = ({ mode, showDialog, setShowDialog, selectedIngredient }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(InitialFormData);
  const [stockError, setStockError] = useState(false);

  const handleClose = () => {
    setFormData({ ...InitialFormData });
    setStockError(false);
    setShowDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.stock === 0) return setStockError(true);

    if (mode === "new") {
      dispatch(createIngredient(formData));
    } else {
      dispatch(editIngredient({ id: selectedIngredient._id, ingredient: formData }));
    }
    setShowDialog(false);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleStockChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, stock: value ? parseInt(value, 10) : "" });
  };

  const onHandleCategory = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, category: selectedOptions });
  };

  const uploadImage = (url) => {
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
    <Modal show={showDialog} onHide={handleClose} dialogClassName="modal-dialog">
      <Modal.Header closeButton>
        {mode === "new" ? (
          <Modal.Title>Create New Ingredient</Modal.Title>
        ) : (
          <Modal.Title>Edit Ingredient</Modal.Title>
        )}
      </Modal.Header>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="Name"
              required
              value={formData.name}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            as="textarea"
            onChange={handleChange}
            rows={3}
            value={formData.description}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label className="mr-1">Stock</Form.Label>
          {stockError && (
            <span className="error-message">재고를 추가해주세요</span>
          )}
          <Form.Control
            onChange={handleStockChange}
            type="number"
            placeholder="Enter stock"
            value={formData.stock}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Image" required>
          <Form.Label>Image</Form.Label>
          <CloudinaryUploadWidget uploadImage={uploadImage} />
          {formData.images.map((img, idx) => (
            <img
              key={idx}
              id={`uploadedimage_main_${idx}`}
              src={img}
              className="upload-image mt-2"
              alt="uploadedimage"
              style={{
                maxWidth: "100%",
                height: "auto",
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          ))}
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={formData.price}
              required
              onChange={handleChange}
              type="number"
              placeholder="0"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="discountPrice">
            <Form.Label>Discount %</Form.Label>
            <Form.Control
              value={formData.discountPrice}
              onChange={handleChange}
              type="number"
              placeholder="0"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="reviewCnt">
            <Form.Label>Review Count</Form.Label>
            <Form.Control
              value={formData.reviewCnt}
              onChange={handleChange}
              type="number"
              placeholder="0"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              multiple
              onChange={onHandleCategory}
              value={formData.category}
              required
            >
              {CATEGORY.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={handleChange}
              required
            >
              {STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        {mode === "new" ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Edit
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default NewItemDialog;
