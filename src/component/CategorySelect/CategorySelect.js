import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const CategorySelect = ({ label, options, value, onChange }) => {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
    >
      <MenuItem value="">
        <em>선택하세요</em>
      </MenuItem>
      {options.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CategorySelect;
