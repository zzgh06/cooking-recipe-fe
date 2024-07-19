import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, styled, Typography, List, ListItem, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromShoppingList, removeFromCompletedList, addToCompletedList } from '../../redux/ingredientSlice';

const HeadContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  borderBottom: '4px solid #333',
  paddingLeft: '10px',
});

const ListSection = styled(Box)({
  marginBottom: '24px',
});

const ListItems = styled(ListItem)({
  borderTop: "1px solid #e0e0e0",
  padding: '8px 16px',
  borderRadius: '4px',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '&:last-child': {
    borderBottom: '1px solid #e0e0e0',
  }
});

const StyledCheckbox = styled(Checkbox)({
  marginRight: '16px',
});

const DeleteButton = styled(IconButton)({
  color: '#d32f2f',
  '&:hover': {
    color: '#b71c1c',
  },
  width: '36px',
  height: '36px',
});

const MyGroceryNote = () => {
  const dispatch = useDispatch();
  const selectedShoppingList = useSelector((state) => state.ingredients.selectedShoppingList);
  const completedShoppingList = useSelector((state) => state.ingredients.completedShoppingList);

  const handleDeleteFromShoppingList = (item) => {
    dispatch(removeFromShoppingList([item]));
  };

  const handleAddFromCompletedList = (item) => {
    dispatch(addToCompletedList([item]));
    dispatch(removeFromShoppingList([item]));
  };

  const handleDeleteFromCompletedList = (item) => {
    dispatch(removeFromCompletedList([item]));
  };

  console.log("selectedShoppingList", selectedShoppingList);
  console.log("completedShoppingList", completedShoppingList);

  return (
    <Grid container>
      <Grid item xs={12}>
        <HeadContainer sx={{marginBottom: "30px"}}>
          <Typography variant="h5">나의 정보</Typography>
          <Typography variant="subtitle1">장보기 메모</Typography>
        </HeadContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ListSection>
              <Typography variant="h6" sx={{ marginBottom: '8px' }}>장보기 목록</Typography>
              <List>
                {selectedShoppingList.map((item, index) => (
                  <ListItems key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <StyledCheckbox
                      checked={completedShoppingList.some(i => i._id === item._id)}
                      onChange={() => handleAddFromCompletedList(item)}
                    />
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                      {item.name}
                    </Typography>
                    <DeleteButton onClick={() => handleDeleteFromShoppingList(item)}>
                      <DeleteIcon />
                    </DeleteButton>
                  </ListItems>
                ))}
              </List>
            </ListSection>
          </Grid>

          <Grid item xs={12} md={6}>
            <ListSection>
              <Typography variant="h6" sx={{ marginBottom: '8px' }}>구매 완료 목록</Typography>
              <List>
                {completedShoppingList.map((item, index) => (
                  <ListItems key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ flexGrow: 1, textDecoration: 'line-through', color: 'gray' }}>
                      {item.name}
                    </Typography>
                    <DeleteButton onClick={() => handleDeleteFromCompletedList(item)}>
                      <DeleteIcon />
                    </DeleteButton>
                  </ListItems>
                ))}
              </List>
            </ListSection>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyGroceryNote;
