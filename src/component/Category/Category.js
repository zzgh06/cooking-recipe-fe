import React from 'react'
const categories = [
  '모두보기', '메인요리', '밑반찬', '간식', '간단요리', '초대요리', '채식', '한식', '양식', '일식', '중식'
];

const Category = () => {
  return (
    <div className="category-container">
      {categories.map((category, index) => (
        <div key={index} className="category-item">
          {category}
        </div>
      ))}
    </div>
  );
}

export default Category