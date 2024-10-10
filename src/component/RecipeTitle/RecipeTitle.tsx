import React from 'react';

interface RecipeTitleProps {
  title : string;
  subtitle : string;
}

const RecipeTitle = ({ title, subtitle }: RecipeTitleProps) => {

  return (
    <div className="text-center pb-8 mt-32 md:mt-40">
      <h4 className="font-semibold text-4xl mt-40 pb-3">{title} 레시피</h4>
      <p className="text-gray-600">
        What’s in your fridge의 {subtitle} 레시피를 모두 만나보세요
      </p>
    </div>
  );
};

export default RecipeTitle;