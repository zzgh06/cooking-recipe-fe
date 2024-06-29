import React from 'react';
import '../../style/category.style.css';

const categories = [
  '모두보기', '한식', '중식', '일식', '양식', '기타'
];

const Category = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-container">
      {categories.map((category, index) => (
        <div 
          key={index} 
          className={`category-item ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
}

export default Category;
