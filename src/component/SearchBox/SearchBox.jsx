import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ({ searchQuery, setSearchQuery, placeholder, field, page = 'store', selectedIngredients }) => {
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get(field) || '');

  // 선택된 재료들이 변경될 때마다 검색 상자에 표시할 키워드 업데이트
  useEffect(() => {
    if (selectedIngredients?.length > 0) {
      setKeyword(selectedIngredients.join(', '));
    } else {
      setKeyword('');
    }
  }, [selectedIngredients]);

  // Enter 키 입력 시 검색 실행
  const onCheckEnter = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event.target.value);
    }
  };

  // 검색 버튼 클릭 시 검색 실행
  const handleSearch = (keyword) => {
    if (keyword.trim() === '') {
      // 검색어가 비어 있으면 상태 초기화
      setKeyword('');
      setSearchQuery({ ...searchQuery, page: 1, [field]: '' });
    } else {
      setSearchQuery({ ...searchQuery, page: 1, [field]: keyword });
    }
  };

  // 검색어 입력 시 키워드 상태 업데이트
  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        value={keyword}
        onChange={handleInputChange}
        onKeyPress={onCheckEnter}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleSearch(keyword)} edge="end">
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
