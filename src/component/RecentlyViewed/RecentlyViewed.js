import React from 'react';
import "../../style/RecentlyViewed.style.css";

const RecentlyViewed = ({ recentlyViewedItems }) => {
  console.log(recentlyViewedItems);

  return (
    <div className='recently-viewed'>
      <div className='title'>최근 본 상품</div>
      <div className='body'>
        {recentlyViewedItems.length > 0 && (
          <div className='content'>
            <img src={recentlyViewedItems[0].image} alt={recentlyViewedItems[0].name} />
          </div>
        )}
        {recentlyViewedItems.length > 1 && (
          <div className='content'>
            <img src={recentlyViewedItems[1].image} alt={recentlyViewedItems[1].name} />
          </div>
        )}
      </div>
      <div className='footer'><a href='#'>TOP ▲</a></div>
    </div>
  );
};

export default RecentlyViewed;
