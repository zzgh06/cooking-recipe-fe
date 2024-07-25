import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserTable from '../component/UserTable/UserTable';
import UserDetailDialog from '../component/UserDetailDialog/UserDetailDialog';
import SearchBox from '../component/SearchBox/SearchBox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useGetUsersInfo } from '../hooks/User/useGetUsersInfo';
import { useDeleteUser } from '../hooks/User/useDeleteUser';
import { Oval } from 'react-loader-spinner';

const AdminUserPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState({
    page: Number(query.get("page")) || 1,
    name: query.get("name") || "",
  });

  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, isLoading } = useGetUsersInfo(searchQuery);
  const { mutateAsync: deleteUser } = useDeleteUser();

  const usersData = data?.usersData || [];
  const totalPageNum = data?.totalPageNum || 0;

  const tableHeader = [
    "#",
    "Name",
    "Email",
    "Level",
    "Ship To",
    "Join Date",
  ];


  useEffect(() => {
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();
    navigate("?" + queryString);
  }, [searchQuery, navigate]);

  const handleUserDelete = async (id) => {
    await deleteUser(id);
    handleClose();
  };

  const handlePageChange = (event, value) => {
    setSearchQuery(prev => ({ ...prev, page: value }));
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
    setSelectedUser(null);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Oval 
          height="80" 
          width="80" 
          color="green" 
          ariaLabel="loading"
        />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="유저명 입력"
          field="name"
        />
      </Box>

      <UserTable
        header={tableHeader}
        data={usersData}
        onRowClick={handleRowClick}
        deleteUser={handleUserDelete}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Stack spacing={2}>
          <Pagination
            count={totalPageNum}
            page={searchQuery.page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Stack>
      </Box>

      {showDialog && selectedUser && (
        <UserDetailDialog
          open={showDialog}
          handleClose={handleClose}
          user={selectedUser}
          deleteUser={handleUserDelete}
        />
      )}
    </Container>
  );
};

export default AdminUserPage;
