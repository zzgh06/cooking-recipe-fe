import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Container } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserTable from '../component/UserTable/UserTable';
import { deleteUser, getUsersInfo } from '../redux/userSlice';
import UserDetailDialog from '../component/UserDetailDialog/UserDetailDialog';
import "../style/adminUserPage.style.css";
import SearchBox from '../component/SearchBox/SerachBox';

const AdminUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { usersData, totalPageNum } = useSelector(state => state.auth);
  console.log("totalPageNum", totalPageNum)
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
    if (searchQuery.name === "") {
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();

    navigate("?" + queryString);
  }, [searchQuery]);

  const handleUserDelete = async (id) => {
    await dispatch(deleteUser(id))
    await dispatch(getUsersInfo())
    handleClose();
  }

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
    setSelectedUser(null);
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
          onRowClick={handleRowClick}
          deleteUser={handleUserDelete}
        />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNum}
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
      {showDialog && selectedUser && (
        <UserDetailDialog
          open={showDialog}
          handleClose={handleClose}
          user={selectedUser}
          deleteUser={handleUserDelete}
        />
      )}
    </div>
  );
}

export default AdminUserPage
