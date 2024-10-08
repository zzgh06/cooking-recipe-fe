import React from "react";

const SubBanner = ({ img }: { img: string }) => {
  return (
    <div className="flex justify-center  px-[100px] py-3">
      <img className="w-full h-[130px]" src={img} alt={img} />
    </div>
  );
};

export default SubBanner;
