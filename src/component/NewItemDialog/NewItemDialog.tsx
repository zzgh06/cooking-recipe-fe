import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent
} from '@mui/material';
import CloudinaryUploadWidget from '../../utils/CloudinaryUploadWidget';
import { CATEGORY, STATUS } from '../../constants/ingredient.constants';
import { useCreateIngredient } from '../../hooks/Ingredient/useCreateIngredient';
import { useEditIngredient } from '../../hooks/Ingredient/useEditIngredient';
import { Ingredient } from '../../types';

interface NewItemDialogProps {
  mode: 'new' | 'edit';
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  selectedIngredient: Ingredient | null;
}

const InitialFormData: Ingredient = {
  _id: '', 
  name: '',
  stock: 0,
  images: [],
  description: '',
  category: [],
  status: 'active',
  price: 0,
  discountPrice: 0,
  reviewCnt: 0,
  unit: '',
  qty: 0,  
  totalSales: 0, 
};

const NewItemDialog = ({ mode, showDialog, setShowDialog, selectedIngredient }: NewItemDialogProps) => {
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

    if (mode === 'new') {
      createIngredient(formData);
    } else {
      editIngredient({ id: selectedIngredient?._id, ingredient: formData });
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

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const selectedOptions = event.target.value as string[];
    setFormData({ ...formData, category: selectedOptions });
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
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
      if (mode === 'edit' && selectedIngredient) {
        setFormData(selectedIngredient);
      } else {
        setFormData({ ...InitialFormData });
      }
    }
  }, [showDialog, mode, selectedIngredient]);

  return (
    <Dialog open={showDialog} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{mode === 'new' ? 'Create New Ingredient' : 'Edit Ingredient'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="stock"
                label="Stock"
                variant="outlined"
                fullWidth
                type="number"
                required
                value={formData.stock}
                onChange={handleStockChange}
                error={stockError}
                helperText={stockError ? 'Please enter stock' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                required
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  id="category"
                  multiple
                  value={formData.category || []}
                  onChange={handleCategoryChange}
                >
                  {CATEGORY.map((item, idx) => (
                    <MenuItem key={idx} value={item.toLowerCase()}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select categories</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  id="status"
                  value={formData.status || 'active'}
                  onChange={handleStatusChange}
                  required
                >
                  {STATUS.map((item, idx) => (
                    <MenuItem key={idx} value={item.toLowerCase()}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select status</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <CloudinaryUploadWidget uploadImage={uploadImage} />
              {formData.images && formData.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`uploaded_image_${idx}`}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                />
              ))}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="price"
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                required
                value={formData.price || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="discountPrice"
                label="Discount %"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.discountPrice || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="reviewCnt"
                label="Review Count"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.reviewCnt || ''}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {mode === 'new' ? 'Submit' : 'Edit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewItemDialog;
