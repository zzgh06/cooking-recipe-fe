import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SearchBox = ({name, onCheckEnter}) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          onCheckEnter(event.target.value);
        }
      };

  return (
    <div className={name}>
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default SearchBox