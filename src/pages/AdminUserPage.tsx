import React, { useEffect, useState } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserTable from '../component/UserTable/UserTable';
import UserDetailDialog from '../component/UserDetailDialog/UserDetailDialog';
import SearchBox from '../component/SearchBox/SearchBox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useGetUsersInfo } from '../hooks/User/useGetUsersInfo';
import { useDeleteUser } from '../hooks/User/useDeleteUser';
import { SearchQuery, User } from '../types';

const AdminUserPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    page: Number(query.get("page")) || 1,
    name: query.get("name") || "",
  });
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data, isLoading } = useGetUsersInfo(searchQuery);
  const { mutateAsync: deleteUser } = useDeleteUser();

  const usersData: User[] = data?.usersData || [];
  const totalPageNum: number = data?.totalPageNum || 0;

  const tableHeader: string[] = [
    "#",
    "Name",
    "Email",
    "Level",
    "Ship To",
    "Join Date",
  ];
console.log("usersData", usersData)

  useEffect(() => {
    const params = new URLSearchParams(searchQuery as unknown as Record<string, string>);
    const queryString = params.toString();
    navigate("?" + queryString);
  }, [searchQuery, navigate]);

  const handleUserDelete = async (id: string) => {
    await deleteUser(id);
    handleClose();
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchQuery(prev => ({ ...prev, page: value }));
  };

  const handleRowClick = (user: User) => {
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
        <CircularProgress size="100px" sx={{color: "green"}} />
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
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Stack spacing={2}>
          <Pagination
            count={totalPageNum}
            page={Number(searchQuery.page)}
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
