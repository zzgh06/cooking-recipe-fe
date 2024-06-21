import React from 'react'
import { Table } from 'react-bootstrap';

const UserTable = ({header, data, onRowClick }) => {
  console.log(data)
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
            data.map((item, index) => (
              <tr key={index} onClick={()=> onRowClick(item)}>
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