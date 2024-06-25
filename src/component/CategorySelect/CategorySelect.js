import React from 'react';
import { Form } from 'react-bootstrap';

const CategorySelect = ({ label, options, value, onChange }) => {
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" value={value} onChange={onChange}>
        <option value="">선택하세요</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default CategorySelect;
