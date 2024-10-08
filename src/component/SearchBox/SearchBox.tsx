import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchQuery } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBoxIngredient {
  _id: string;
  name: string;
  images?: string[];
  price?: number;
  qty?: number;
  unit?: string;
  totalSales?: number;
}

interface SearchBoxProps {
  searchQuery: SearchQuery;
  setSearchQuery: Dispatch<SetStateAction<SearchQuery>>;
  onCheckEnter?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedIngredients?: SearchBoxIngredient[];
  placeholder: string;
  field: string;
  page?: string;
}

const SearchBox = ({
  searchQuery,
  setSearchQuery,
  placeholder,
  field,
  page = 'store',
  selectedIngredients
}: SearchBoxProps) => {
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState<string>(query.get(field) || '');

  useEffect(() => {
    if (selectedIngredients && selectedIngredients.length > 0) {
      const ingredientNames = selectedIngredients.map(ingredient => ingredient.name); 
      setKeyword(ingredientNames.join(', ')); 
    } else {
      setKeyword('');
    }
  }, [selectedIngredients]);
  
  
  const onCheckEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    const currentKeyword = keyword;
    if (currentKeyword.trim() === '') {
      setKeyword('');
      setSearchQuery({ ...searchQuery, page: 1, [field]: '' });
    } else {
      setSearchQuery({ ...searchQuery, page: 1, [field]: currentKeyword });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={onCheckEnter}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
      />
      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchBox;