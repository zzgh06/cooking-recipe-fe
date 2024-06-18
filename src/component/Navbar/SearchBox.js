import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SearchBox = ({name, onCheckEnter}) => {
  return (
    <div className={name}>
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        onKeyPress={onCheckEnter}
      />
    </div>
  )
}

export default SearchBox