import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { etcCategory } from '../../constants/recipe.constants';

const RecipeCategory = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    navigate(`/recipes/${category}`);
  };

  return (
    <div className="fixed top-[131px] w-full z-30">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/80 to-white/90 backdrop-blur-lg border-t border-b border-emerald-100" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-2">
            {[
              { id: 'all', name: '전체 레시피' },
              { id: 'best', name: '베스트 레시피' },
              { id: 'new', name: '최신 레시피' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleCategoryClick(item.id)}
                className={`
                  px-6 py-2.5 rounded-full font-medium text-sm
                  transition-all duration-300 transform hover:scale-105
                  ${activeCategory === item.id
                    ? 'bg-gradient-to-r from-emerald-500 to-green-400 text-white shadow-lg hover:shadow-emerald-500/25'
                    : 'bg-white/50 text-gray-700 hover:bg-emerald-50/80 hover:text-emerald-700 border border-emerald-100'
                  }
                `}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {etcCategory.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium
                  transition-all duration-300 transform hover:scale-105
                  ${activeCategory === category
                    ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-md hover:shadow-green-500/25'
                    : 'bg-white/50 text-gray-600 hover:bg-emerald-50/80 hover:text-emerald-600 border border-emerald-100'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-b from-emerald-50/10 to-transparent" />
    </div>
  );
};

export default RecipeCategory;