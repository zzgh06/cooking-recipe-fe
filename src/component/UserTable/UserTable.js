import React from "react";
import { Button, Table } from "react-bootstrap";

const UserTable = ({ header, data, onRowClick }) => {

  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((user, index) => (
              <tr key={index} onClick={() => onRowClick(user)}>
                <th>{index}</th>
                <th>{user.name}</th>
                <th>{user.email}</th>
                <th>{user.level}</th>
                <th>{user.shipTo}</th>
                <th>{user.createdAt.slice(0, 10)}</th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
