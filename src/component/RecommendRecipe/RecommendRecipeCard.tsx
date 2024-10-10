import React from "react";

interface RecipeCardProps {
  src: string;
  alt: string;
  onClick: () => void;
  category?: string;
  cookTime?: string;
  className?: string;
  size?: 'large' | 'small';
  featured?: boolean;
}

const RecommendRecipeCard = ({
  src,
  alt,
  onClick,
  category = "메인 요리",
  cookTime = "30분",
  className = "",
  size = 'small',
  featured = false
}: RecipeCardProps) => {
  const sizeClasses = {
    large: 'h-[400px]',
    small: 'h-[200px]'
  };

  return (
    <div
      onClick={onClick}
      className={`relative w-full group cursor-pointer overflow-hidden rounded-xl ${sizeClasses[size]} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        {featured && (
          <div className="mb-2">
            <span className="px-2 py-1 bg-yellow-500 text-black rounded-full text-xs font-medium">
              추천
            </span>
          </div>
        )}

        <h3 className="text-base font-bold mb-1 group-hover:text-yellow-400 transition-colors line-clamp-2">
          {alt}
        </h3>

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-200">
          <span className="inline-flex items-center">
            <span className="w-1 h-1 bg-yellow-400 rounded-full mr-1.5"></span>
            {category}
          </span>
          <span className="inline-flex items-center">
            <span className="w-1 h-1 bg-yellow-400 rounded-full mr-1.5"></span>
            {cookTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendRecipeCard;
