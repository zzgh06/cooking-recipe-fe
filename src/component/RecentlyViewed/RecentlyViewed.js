import React from "react";
import "../../style/RecentlyViewed.style.css";
import { Link } from "react-router-dom";

const RecentlyViewed = ({ recentlyViewedItems }) => {
  return (
    <div className="recently-viewed">
      <div className="title">최근 본 상품</div>
      <div className="body">
        {recentlyViewedItems.length > 0 &&
          recentlyViewedItems.map((item) => (
            <div className="content">
              <Link to={`/ingredients/${item.id}`}>
              <img
                src={item.images}
                alt={item.name}
              />
              </Link>
            </div>
          ))}
      </div>
      <div className="footer">
        <a href="#">TOP ▲</a>
      </div>
    </div>
  );
};

export default RecentlyViewed;
