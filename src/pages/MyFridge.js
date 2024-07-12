import React, { useEffect, useState } from "react";
import "../style/myFridge.style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients, setSelectedIngredients } from "../redux/ingredientSlice";
import MyFridgeSearchResults from "../component/MyFridgeSearchResults/MyFridgeSearchResults";
import SearchResultCard from "../component/SearchResultCard/SearchResultCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  fetchFridgeItems,
  fetchRecommendedRecipes,
  fridgeIngredientRecipeResult,
} from "../redux/fridgeSlice";
import FridgeItemCard from "../component/FridgeItemCard/FridgeItemCard";
import SearchBox from "../component/SearchBox/SerachBox";
import RecentlyViewed from "../component/RecentlyViewed/RecentlyViewed";
import { Spinner } from "react-bootstrap";

const MyFridge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredient = useSelector(
    (state) => state.ingredients.ingredients || []
  );
  const {
    fridgeItems,
    recipeList,
    loading,
    recipeLoading,
  } = useSelector((state) => state.fridge || []);


  const selectedIngredients = useSelector(
    (state) => state.ingredients.selectedIngredients
  );
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  const [recommendClicked, setRecommendClicked] = useState(false);

  useEffect(() => {
    const viewedItems =
      JSON.parse(localStorage.getItem("viewedIngredients")) || [];
    setRecentlyViewedItems(viewedItems);
  }, []);

  useEffect(() => {
    if (searchQuery.name) {
      dispatch(fetchIngredients(searchQuery));
      dispatch(fridgeIngredientRecipeResult(searchQuery));
      setHasSearched(true);
      setRecommendClicked(false);
    } else {
      dispatch(fridgeIngredientRecipeResult(searchQuery));
    }
  }, [dispatch, searchQuery]);

  useEffect(() => {
    dispatch(fetchFridgeItems());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedIngredients([]));
    };
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const newSearchQuery = { ...searchQuery, name: e.target.value };
    setSearchQuery(newSearchQuery);
    if (e.target.value) {
      setQuery({ name: e.target.value });
    } else {
      navigate("/fridge");
      setHasSearched(false);
    }
  };

  const handleCheckboxChange = (name) => {
    setCheckedItems((prev) => {
      const newCheckedItems = new Set(prev);
      if (newCheckedItems.has(name)) {
        newCheckedItems.delete(name);
      } else {
        newCheckedItems.add(name);
      }
      return newCheckedItems;
    });
  };

  const handleRecommendRecipes = () => {
    if (checkedItems.size > 0) {
      const selectedIngredients = Array.from(checkedItems);
      dispatch(fetchRecommendedRecipes(selectedIngredients));
      setRecommendClicked(true);
      setHasSearched(false);
    }
  };

  return (
    <>
      <div className="fridge-container">
        <div className="fridge-title">
          <h2>My 냉장고</h2>
          <p>나만의 냉장고에 재료를 추가하고 최적의 레시피를 추천해드려요</p>
        </div>

        {fridgeItems.length === 0 ? (
          <div className="fridge">
            <div className="fridge-empty-message">
              <p>
                냉장고가 텅 비워져 있습니다 😅 <br />
                My 냉장고를 가득 채워주세요.{" "}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="fridge">
              {fridgeItems.map((item) => (
                <FridgeItemCard
                  key={item.ingredientId._id}
                  item={item.ingredientId}
                  id={item._id}
                  isChecked={checkedItems.has(item.ingredientId.name)}
                  onCheckboxChange={() =>
                    handleCheckboxChange(item.ingredientId.name)
                  }
                />
              ))}
            </div>
            <div className="recipe-recommend__button">
              <button type="button" onClick={handleRecommendRecipes}>
                레시피 추천
              </button>
            </div>
          </>
        )}
        <div className="fridge-ingredient-search">
          <div className="search-layout">
            <p className="title">원하시는 식재료를 검색해주세요</p>
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onCheckEnter={handleSearchChange}
              selectedIngredients={selectedIngredients}
              placeholder="냉장고 속 재료 검색"
              field="name"
              page="fridge"
            />
          </div>
          {hasSearched && (
            <div className="fridge-search-result">
              {loading ? (
                <div className="text-center my-3">
                  <Spinner animation="border" />
                </div>
              ) : ingredient.length === 0 ? (
                <p>일치하는 재료가 없습니다.</p>
              ) : (
                ingredient.map((item) => (
                  <SearchResultCard key={item._id} item={item} />
                ))
              )}
            </div>
          )}
        </div>
        {(hasSearched || recommendClicked) && (
          <div>
            {recipeLoading ? (
              <div className="text-center my-3">
                <Spinner animation="border" />
              </div>
            ) : (
              <MyFridgeSearchResults recipeList={recipeList} />
            )}
          </div>
        )}
      </div>
      {recentlyViewedItems.length >= 1 ? (
        <RecentlyViewed recentlyViewedItems={recentlyViewedItems} />
      ) : (
        ""
      )}
    </>
  );
};

export default MyFridge;