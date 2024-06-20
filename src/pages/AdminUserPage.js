import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import SearchBox from '../component/Navbar/SearchBox';
import { Container } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserTable from '../component/UserTable/UserTable';
import { getUsersInfo } from '../redux/userSlice';

const AdminUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    orderNum: query.get("orderNum") || "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const { usersData } = useSelector(state => state.auth);
 
  const tableHeader = [
    "#",
    "Name",
    "Email",
    "Level",
    "Ship To",
    "Join date",
  ];

  useEffect(() => {
    dispatch(getUsersInfo());
  }, []);

  useEffect(() => {
    if (searchQuery.orderNum === "") {
      delete searchQuery.orderNum;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();

    navigate("?" + queryString);
  }, [searchQuery]);



  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="locate-center">
      <Container className="container-custom">
        <div className="mt-2 display-center mb-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="오더번호"
            field="orderNum"
          />
        </div>

        <UserTable
          header={tableHeader}
          data={usersData}
        />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          // pageCount={totalPageNum}
          forcePage={searchQuery.page - 1}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </Container>

    </div>
  );
}

export default AdminUserPage
