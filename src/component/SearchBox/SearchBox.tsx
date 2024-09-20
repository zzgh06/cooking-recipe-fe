import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchQuery } from '../../types';

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
      setKeyword(selectedIngredients.join(', '));
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
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={onCheckEnter}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ borderRadius: 1 }}
      />
    </div>
  );
};

export default SearchBox;