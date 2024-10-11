import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetUsersInfo } from '../hooks/User/useGetUsersInfo';
import { useDeleteUser } from '../hooks/User/useDeleteUser';
import { SearchQuery, User } from '../types';
import UserTable from '../component/UserTable/UserTable';
import UserDetailDialog from '../component/UserDetailDialog/UserDetailDialog';
import SearchBox from '../component/SearchBox/SearchBox';
import PaginationComponent from '../component/Pagination/PaginationComponent';

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
  const totalPages: number = data?.totalPageNum || 0;
  const itemsPerPage: number = 1;


  const tableHeader: string[] = [
    "#",
    "Name",
    "Email",
    "Level",
    "Ship To",
    "Join Date",
  ];

  useEffect(() => {
    const params = new URLSearchParams(searchQuery as unknown as Record<string, string>);
    const queryString = params.toString();
    navigate("?" + queryString);
  }, [searchQuery, navigate]);

  const handleUserDelete = async (id: string) => {
    await deleteUser(id);
    handleClose();
  };

  const handlePageChange = (pageNumber: number) => {
    setSearchQuery({ ...searchQuery, page: pageNumber });
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-24 w-24 border-8 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-4">
      <div className="mb-4 flex justify-center">
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="유저명 입력"
          field="name"
        />
      </div>

      <UserTable
        header={tableHeader}
        data={usersData}
        onRowClick={handleRowClick}
      />

      <PaginationComponent
        activePage={Number(searchQuery.page)}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalPages}
        onPageChange={handlePageChange}
      />

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
};

export default AdminUserPage;
