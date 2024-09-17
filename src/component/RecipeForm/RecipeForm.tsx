import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Modal,
  Box,
  Typography,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Ingredient, Recipe } from "../../types";

const HeadContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "baseline",
  borderBottom: "4px solid black",
  padding: "10px",
});

const PlaceholderImage = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  backgroundColor: "#f9f9f9",
  padding: "80px 0",
  margin: "0 auto",
  border: "1px solid lightgrey",
  borderRadius: "15px",
});

interface Step {
  description: string;
  image: string | null;
}

// interface IngredientInForm {
//   name: string;
//   qty: number;
//   unit: string;
// }

// interface RecipeFormData {
//   _id?: string;
//   name: string;
//   description: string;
//   images: string[];
//   foodCategory: string;
//   moodCategory: string;
//   methodCategory: string;
//   ingredientCategory: string;
//   etcCategory: string;
//   servings: string;
//   time: string;
//   difficulty: string;
//   ingredients: Ingredient[]; 
//   steps: Step[];
//   categories?: {
//     food: string;
//     mood: string;
//     method: string;
//     ingredient: string;
//     etc: string;
//   };
// }


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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, borderRadius: 2 }}
    >
      <HeadContainer>
        <Typography variant="h5">레시피 제목</Typography>
      </HeadContainer>
      <TextField
        fullWidth
        label="레시피 제목"
        variant="outlined"
        margin="normal"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <HeadContainer>
        <Typography variant="h5">요리 소개</Typography>
      </HeadContainer>
      <TextField
        fullWidth
        label="요리 소개"
        variant="outlined"
        multiline
        rows={6}
        margin="normal"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <HeadContainer sx={{ width: "100%" }}>
            <Typography variant="h5">레시피 이미지</Typography>
          </HeadContainer>
          <CloudinaryUploadWidget
            uploadImage={uploadMainImage}
            type="main"
            index={null}
          />
        </Box>
        {formData.images.length > 0 ? (
          formData.images.map((img, idx) => (
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
          ))
        ) : (
          <PlaceholderImage>
            <FontAwesomeIcon icon={faImage} fontSize="50px" />
            <Typography variant="h5" sx={{ marginTop: "10px" }}>
              요리 대표 사진을 등록해주세요.
            </Typography>
            <Typography variant="body1" component="p">
              음식사진 외 사람/동물 등의 사진은 삼가해주세요.
            </Typography>
          </PlaceholderImage>
        )}
      </Box>
      <HeadContainer sx={{ marginBottom: "15px" }}>
        <Typography variant="h5">요리 정보</Typography>
      </HeadContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <CategorySelect
            label="음식 종류"
            options={foodCategory}
            value={formData.foodCategory}
            onChange={(e) =>
              setFormData({ ...formData, foodCategory: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CategorySelect
            label="상황"
            options={moodCategory}
            value={formData.moodCategory}
            onChange={(e) =>
              setFormData({ ...formData, moodCategory: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CategorySelect
            label="방법"
            options={methodCategory}
            value={formData.methodCategory}
            onChange={(e) =>
              setFormData({ ...formData, methodCategory: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CategorySelect
            label="재료"
            options={ingredientCategory}
            value={formData.ingredientCategory}
            onChange={(e) =>
              setFormData({ ...formData, ingredientCategory: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CategorySelect
            label="기타"
            options={etcCategory}
            value={formData.etcCategory}
            onChange={(e) =>
              setFormData({ ...formData, etcCategory: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CategorySelect
            label="인원"
            options={servings}
            value={formData.servings}
            onChange={(e) =>
              setFormData({ ...formData, servings: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CategorySelect
            label="시간"
            options={time}
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CategorySelect
            label="난이도"
            options={difficulty}
            value={formData.difficulty}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <HeadContainer sx={{ marginTop: "15px" }}>
        <Typography variant="h5">재료 정보</Typography>
      </HeadContainer>
      {formData.ingredients.map((ingredient, index) => (
        <Grid container spacing={2} alignItems="center" key={index}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="재료명"
              variant="outlined"
              margin="normal"
              value={ingredient.name || ""}
              onChange={(e) =>
                handleChange(index, "name", e.target.value, "ingredients")
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="양"
              variant="outlined"
              margin="normal"
              value={ingredient.qty}
              onChange={(e) =>
                handleChange(index, "qty", e.target.value, "ingredients")
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="단위"
              variant="outlined"
              margin="normal"
              value={ingredient.unit || ""}
              onChange={(e) =>
                handleChange(index, "unit", e.target.value, "ingredients")
              }
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <IconButton
              sx={{ width: "70px", padding: "15px 0" }}
              color="error"
              onClick={() => handleDeleteIngredient(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={handleAddIngredient}
        sx={{ mt: 2 }}
      >
        재료 추가
      </Button>
      <HeadContainer sx={{ my: "15px" }}>
        <Typography variant="h5">요리 순서</Typography>
      </HeadContainer>
      {formData.steps.map((step, index) => (
        <Grid container spacing={2} alignItems="center" key={index}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="요리 설명"
              variant="outlined"
              multiline
              rows={6}
              margin="normal"
              value={step.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value, "steps")
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
            <CloudinaryUploadWidget
              uploadImage={(url: string) => uploadStepImage(url, "steps", index)}
              type="steps"
              index={index}
            />
            <IconButton
              sx={{ width: "70px", padding: "15px 0" }}
              color="error"
              onClick={() => handleDeleteStep(index)}
            >
              <DeleteIcon />
            </IconButton>
            </Box>
            {step.image && (
              <img
                id={`uploadedimage_steps_${index}`}
                src={step.image}
                className="upload-image mt-2"
                alt="uploadedimage"
                style={{
                  maxWidth: "100%",
                  height: "120px",
                  marginTop: 10,
                  borderRadius: 5,
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={2}>
            <IconButton
              sx={{ width: "70px", padding: "15px 0" }}
              color="error"
              onClick={() => handleDeleteStep(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={handleAddStep}
        sx={{ mt: 2 }}
      >
        요리 순서 추가
      </Button>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{width : "250px"}}
          >
            레시피 제출
          </Button>
        </Grid>
      </Grid>

      <Modal
        open={showSubmitModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            레시피 제출 완료
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            레시피 제출이 완료되었습니다.
          </Typography>
          <Button variant="contained" onClick={handleCloseModal} sx={{ mt: 2 }}>
            닫기
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default RecipeForm;
