import React from "react";
import { Link } from "react-router-dom";
import { RecentlyViewedItem } from "../../types";

interface RecentlyViewedProps {
  recentlyViewedItems: RecentlyViewedItem[];
}

const RecentlyViewed = ({ recentlyViewedItems }: RecentlyViewedProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  const optimizeImageUrl = (url: string) => {
    return url.replace(/\/upload\//, '/upload/c_fill,h_140,w_140,f_auto,q_auto,f_webp/');
  };

  return (
    <div className="fixed bottom-[50px] right-[15px] flex flex-col items-center w-[100px] min-h-[200px] max-h-[400px] text-black border border-[rgb(198,198,198)] rounded-[5px] z-50 bg-white shadow-lg overflow-y-auto">
      <h6 className="w-full p-[15px] px-[7px] mb-[5px] text-[14px] text-center text-black">
        최근 본 상품
      </h6>
      <div className="flex flex-col justify-evenly items-center w-full flex-grow">
        {recentlyViewedItems.length > 0 &&
          recentlyViewedItems.map((item) => (
            <div key={item.id} className="w-[75px] h-[75px] border border-[rgb(180,180,180)] rounded-[5px] mb-[10px] overflow-hidden">
              <Link to={`/ingredients/${item.id}`} className="block w-full h-full">
                <img
                  src={optimizeImageUrl(item.images)}
                  alt={item.name}
                  className="w-full h-full rounded-[5px] object-cover"
                />
              </Link>
            </div>
          ))}
      </div>
      <div className="w-full p-[10px] text-center">
        <a
          onClick={scrollToTop}
          className="text-black no-underline text-[14px] cursor-pointer inline-block"
        >
          TOP ▲
        </a>
      </div>
    </div>
  );
};

export default RecentlyViewed;