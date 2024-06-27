import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchBox = ({searchQuery, setSearchQuery, onCheckEnter, placeholder, field, page='store'}) => {
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get(field) || "");
  let navigate = useNavigate()
  console.log(keyword)
  
  return (
    <div className="search-box">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder={placeholder}
        onKeyPress={onCheckEnter}
        onChange={(event) => setKeyword(event.target.value)}
        value={keyword}
      />
    </div>
  )
}

export default SearchBox