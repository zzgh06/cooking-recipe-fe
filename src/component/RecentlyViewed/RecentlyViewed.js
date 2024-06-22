import React, { useEffect, useState } from 'react'
import "../../style/RecentlyViewed.style.css"

const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];
    setRecentlyViewed(viewedProducts);
  }, []);
  return (
    <div className='recently-viewed'>
      <div className='title' style={{color: 'white'}}>CART</div>
      <div className='body'>
        <div className='content'>
          {/* 최근 본 레시피 혹은 상품이 보여질 곳 */}
          {/* <img src={ingredient.image} alt=''/> */}
        </div>
        <div className='content'>
          {/* 최근 본 레시피 혹은 상품이 보여질 곳 */}
          <img src="" alt=''/>
        </div>
      </div>
      <div className='footer'><a href='#'>TOP ▲</a></div>
    </div>
  )
}

export default RecentlyViewed