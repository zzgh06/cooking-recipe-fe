import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setToastMessage } from "./commonUISlice";

// export const deleteRecipe = createAsyncThunk(
//   "recipe/deleteRecipe",
//   async (id, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await api.delete(`/recipe/${id}`);
//       dispatch(
//         setToastMessage({
//           message: "레시피가 삭제되었습니다",
//           status: "success",
//         })
//       );
//       return id;
//     } catch (err) {
//       dispatch(
//         setToastMessage({
//           message: err.error,
//           status: "error",
//         })
//       );
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipes: [],
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    addRecipeToState: (state, action) => {
      state.recipes.push(action.payload);
    },
    updateRecipeInState: (state, action) => {
      const updatedRecipe = action.payload;
      const index = state.recipes.findIndex(
        (recipe) => recipe._id === updatedRecipe._id
      );
      if (index !== -1) {
        state.recipes[index] = updatedRecipe;
      } else {
        console.error('Recipe not found with ID:', updatedRecipe._id);
      }
    },
    removeRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe._id !== action.payload
      );
    },
  }
});

export const { addRecipeToState, updateRecipeInState, removeRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
