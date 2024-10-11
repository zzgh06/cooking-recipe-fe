import React from "react";
import { Recipe } from "../../types";

interface RecipeTableProps {
  header: string[];
  data: Recipe[];
  deleteItem: (id: string) => void;
  openEditForm: (item: Recipe) => void;
}

const RecipeTable = ({ header = [], data = [], deleteItem, openEditForm }: RecipeTableProps) => {
  const optimizedImageUrl = (url: string) =>
    url?.replace(/\/upload\//, "/upload/c_fill,h_200,w_200,f_webp/");

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {header.map((title, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item?.categories?.etc || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item?.time || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item?.servings || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item?.difficulty || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item?.reviewCnt || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item?.images && item.images.length > 0 ? (
                      <img
                        src={optimizedImageUrl(item.images[0])}
                        alt="Recipe"
                        className="w-[100px] aspect-video object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteItem(item._id || "")}
                        className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => openEditForm(item)}
                        className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={header.length}
                  className="px-6 py-4 text-sm text-gray-500 text-center"
                >
                  No Data to show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipeTable;
