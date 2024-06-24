import React from "react";
import "../../style/RecentlyViewed.style.css";

const RecentlyViewed = ({ recentlyViewedItems }) => {
  console.log(recentlyViewedItems);

  return (
    <div className="recently-viewed">
      <div className="title">최근 본 상품</div>
      <div className="body">
        {recentlyViewedItems.length > 0 &&
          recentlyViewedItems.map((item) => (
            <div className="content">
              <img
                src={item.image}
                alt={item.name}
              />
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
