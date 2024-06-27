import React from "react";
import { Table, Badge } from "react-bootstrap";
import { currencyFormat } from "../../utils/number";

const OrderTable = ({ header, data, openEditForm, badgeBg }) => {
  console.log(data);
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
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr onClick={() => openEditForm(item)}>
                <th>{index}</th>
                <th>{item.orderNum}</th>
                <th>{item.createdAt.slice(0, 10)}</th>
                <th>{item.userId.email}</th>
                {item.items.length > 0 ? (
                  <th>
                    {item.items[0].ingredientId.name}
                    {item.items.length > 1 && ` 외 ${item.items.length - 1}개`}
                  </th>
                ) : (
                  <th></th>
                )}

                <th>
                  {item.contactInfo.shipTo.address +
                    " " +
                    item.contactInfo.shipTo.city}
                </th>

                <th>{currencyFormat(item.totalPrice)}</th>
                <th>
                  <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
                </th>
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
export default OrderTable;
