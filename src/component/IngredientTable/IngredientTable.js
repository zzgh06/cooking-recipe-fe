import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const IngredientTable = ({ header = [], data = [], deleteItem, openEditForm }) => {  
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
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ minWidth: "100px" }}>{item?.name || "N/A"}</td>
                <td style={{ minWidth: "150px" }}>{item?.description || "N/A"}</td>
                <td>₩ {item?.price ? item.price.toFixed(2) : "N/A"}</td>
                <td>{item?.discountPrice ? item.discountPrice.toFixed(2) : "N/A"}</td>
                <td>{Array.isArray(item?.category) ? item.category.join(", ") : "N/A"}</td>
                <td>{item?.stock || "N/A"}</td>
                <td>{item?.status || "N/A"}</td>
                <td>{item?.reviewCnt || "N/A"}</td>
                <td><img src={item?.image || "default_image_url"} alt={item?.name || "default"} style={{ width: '100px' }} /></td> 
                <td style={{ minWidth: "100px" }}>
                  <div className="d-flex justify-content-between"> 
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteItem(item?._id)}
                      className="mr-1"
                    >
                      -
                    </Button>
                    <Button size="sm" onClick={() => openEditForm(item)}>
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={header.length} className="text-center">No Data to show</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default IngredientTable;
