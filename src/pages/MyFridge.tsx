import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { setSelectedIngredients } from "../redux/ingredientSlice";
import { useFetchIngredients } from "../hooks/Ingredient/useFetchIngredients";
import { useFetchFridgeItems } from "../hooks/Fridge/useFetchFridgeItems";
import { useFetchRecommendedRecipes } from "../hooks/Recipe/useFetchRecommendedRecipes";
import { FridgeItem, Ingredient, RecentlyViewedItem, SearchQuery } from "../types";
import RecentlyViewed from "../component/RecentlyViewed/RecentlyViewed";
import MyFridgeSearchResults from "../component/MyFridgeSearchResults/MyFridgeSearchResults";
import SearchResultCard from "../component/SearchResultCard/SearchResultCard";
import FridgeItemCard from "../component/FridgeItemCard/FridgeItemCard";
import SearchBox from "../component/SearchBox/SearchBox";
import MyFridgeSkeleton from "../component/Skeleton/MyFridgeSkeleton";

interface RecentlyViewedIngredient {
  id: string;
  images: string;
  name: string;
}

const MyFridge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedIngredients = useSelector(
    (state: RootState) => state.ingredients.selectedIngredients || []
  );
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    page: Number(query.get("page")) || 1,
    name: query.get("name") || "",
  });
  const { data: ingredientData, isLoading: ingredientLoading } = useFetchIngredients(searchQuery);
  const { data: fridgeData, isLoading, refetch } = useFetchFridgeItems(query);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [recentlyViewedItems, setRecentlyViewedItems] = useState<RecentlyViewedItem[]>([]);
  const [recommendClicked, setRecommendClicked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const {
    data: recipeList,
    isLoading: recipeLoading,
    refetch: refetchRecipes,
  } = useFetchRecommendedRecipes(Array.from(checkedItems));

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  useEffect(() => {
    const viewedItems: RecentlyViewedIngredient[] =
      JSON.parse(localStorage.getItem("viewedIngredients") || "[]");

    const convertedItems: RecentlyViewedItem[] = viewedItems.map(item => ({
      id: item.id,
      name: item.name,
      images: item.images
    }));

    setRecentlyViewedItems(convertedItems);
  }, []);

  useEffect(() => {
    if (searchQuery.name) {
      setHasSearched(true);
      setRecommendClicked(false);
    } else {
      setHasSearched(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedIngredients([]));
    };
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = { ...searchQuery, name: e.target.value };
    setSearchQuery(newSearchQuery);
    if (e.target.value) {
      setQuery({ name: e.target.value });
    } else {
      navigate("/fridge");
      setHasSearched(false);
    }
  };

  const handleCheckboxChange = (name: string) => {
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
      setRecommendClicked(true);
      setHasSearched(false);
      refetchRecipes();
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setRecommendClicked(false);
  };

  if (isLoading) {
    return (
      <MyFridgeSkeleton />
    )
  }

  return (
    <div className="py-[50px] sm:px-[10px] md:px-[30px] lg:px-[150px] xl:px-[200px]">
      <div className="text-center mb-5">
        <h1 className="text-4xl font-bold mb-2">My 냉장고</h1>
        <p className="text-lg">나만의 냉장고에 재료를 추가하고 최적의 레시피를 추천해드려요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col justify-center items-center p-5 mb-5 border border-light-gray rounded-lg shadow-md">
          {fridgeData?.length === 0 ? (
            <p className="text-lg">
              냉장고가 텅 비워져 있습니다 😅 <br />
              My 냉장고를 가득 채워주세요.
            </p>
          ) : (
            <>
              <div className="grid sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-5">
                {fridgeData?.map((item: FridgeItem) => (
                  <div key={item.ingredientId._id} className="flex">
                    <FridgeItemCard
                      item={item.ingredientId}
                      id={item._id}
                      isChecked={checkedItems.has(item.ingredientId.name)}
                      onCheckboxChange={() =>
                        handleCheckboxChange(item.ingredientId.name)
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center mb-5">
                <button
                  className="w-[300px] bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200"
                  onClick={handleRecommendRecipes}
                >
                  레시피 추천
                </button>
              </div>
            </>
          )}
        </div>

        <div>
          <div className="flex flex-col items-center p-5 mb-5">
            <h2 className="text-2xl font-semibold mb-2 min-w-[350px]">
              원하시는 식재료를 검색해주세요
            </h2>
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
            <div className="text-center p-2 border-t border-b border-light-gray mb-5">
              {ingredientLoading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin h-16 w-16 border-b-4 border-green-500 rounded-full" />
                </div>
              ) : ingredientData?.ingredients?.length === 0 ? (
                <div className="p-10 shadow-md rounded-lg">
                  <h5 className="text-xl">일치하는 재료가 없습니다. 😅</h5>
                </div>
              ) : (
                ingredientData?.ingredients?.map((item: Ingredient) => (
                  <SearchResultCard key={item._id} item={item} />
                ))
              )}
            </div>
          )}

          {open && (
            <div className="fixed inset-0 top-[60px] flex items-center justify-center z-50 bg-black bg-opacity-50"> {/* 어두운 배경 추가 */}
              <div className="bg-white rounded-lg shadow-lg max-w-[800px] w-full p-6 max-h-[80vh] overflow-y-auto">
                <div className="border-b pb-4 mb-4">
                  <h4 className="text-center text-3xl font-bold">추천 레시피</h4>
                </div>
                <div className="flex justify-center items-center mb-4">
                  {recipeLoading ? (
                    <div className="animate-spin h-24 w-24 border-b-4 border-green-500 rounded-full" />
                  ) : (
                    <MyFridgeSearchResults recipeList={recipeList || []} />
                  )}
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="w-[300px] bg-blue-600 text-white rounded-md px-6 py-3 hover:bg-blue-700 transition duration-200"
                    onClick={handleClose}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {recentlyViewedItems.length >= 1 && (
        <RecentlyViewed recentlyViewedItems={recentlyViewedItems} />
      )}
    </div>
  );
};

export default MyFridge;
