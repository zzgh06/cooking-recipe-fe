import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const RecipeTable = ({ header = [], data = [], deleteItem, openEditForm }) => {
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
                <td>{item?.categories?.food || "N/A"}</td>
                <td>{item?.time || "N/A"}</td>
                <td>{item?.servings || "N/A"}</td>
                <td>{item?.difficulty || "N/A"}</td>
                <td>{item?.reviewCnt || "N/A"}</td>
                <td>
                  {item?.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt="Recipe" style={{ width: "100px" }} />
                  ) : "N/A"}
                </td>
                <td style={{ minWidth: "100px" }}>
                  <div className="d-flex justify-content-between"> 
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        console.log('Deleting recipe with ID:', item._id);
                        deleteItem(item._id);
                      }}
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

export default RecipeTable;
