import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGetUsersInfo } from '../hooks/User/useGetUsersInfo';
import { useFetchOrderList } from '../hooks/Order/useFetchOrderList';

const AdminDashBoardPage = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const orderTableHead = ['주문번호', '주문일자', '구매자', '상품명', '총 주문액'];
  const { data: usersInfo, isLoading } = useGetUsersInfo();
  const { data: orederInfo } = useFetchOrderList()
  
  console.log("usersInfo", usersInfo)
  console.log("orederInfo", orederInfo)
  return (
    <div>
      
    </div>
  )
}

export default AdminDashBoardPage