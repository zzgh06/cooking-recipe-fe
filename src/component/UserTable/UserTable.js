import React from 'react'
import { Table } from 'react-bootstrap';

const UserTable = ({header, data}) => {
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title) => (
              <th>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.users?.length > 0 ? (
            data.users.map((item, index) => (
              <tr>
                <th>{index}</th>
                <th>{item.name}</th>
                <th>{item.email}</th>
                <th>{item.level}</th>
                <th>{item.shipTo}</th>
                <th>{item.createdAt.slice(0, 10)}</th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default UserTable