import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../../style/ingredientAll.style.css";
import IngredientCard from "../IngredientCard/IngredientCard";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../redux/ingredientSlice";

const IngredientAll = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { ingredients, totalPages, status, error } = useSelector(
    (state) => state.ingredients
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [displayCount, setDisplayCount] = useState(8);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const name = searchParams.get("name") || "";
    setCurrentPage(1); // Reset to first page on new search
    setDisplayCount(8); // Reset display count on new search
    dispatch(fetchIngredients({ name }));
  }, [dispatch, searchParams]);

  const loadMore = () => {
    if (displayCount < ingredients.length) {
      setDisplayCount(displayCount + 4);
    } else if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      dispatch(
        fetchIngredients({
          page: nextPage,
          name: searchParams.get("name") || "",
          category: searchParams.get("category") || "",
        })
      );
      setCurrentPage(nextPage);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="ingredient-all__container">
      <h3>모든 상품</h3>
      <Row>
        {ingredients.slice(0, displayCount).map((ing) => (
          <Col lg={3} key={ing._id}>
            <IngredientCard key={ing._id} item={ing} />
          </Col>
        ))}
      </Row>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {hasMore && status !== "loading" && (
        <div className="text-center my-3">
          <Button className="load-more-button" onClick={loadMore}>
            더보기
          </Button>
        </div>
      )}
      {status === "loading" && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
};

export default IngredientAll;
