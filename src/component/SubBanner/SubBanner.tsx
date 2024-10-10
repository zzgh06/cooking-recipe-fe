import React from "react";

const SubBanner = ({ img }: { img: string }) => {
  return (
    <div className="flex justify-center lg:px-[100px] md:px-[50px] sm:px-[20px] p-8">
      <img className="w-full h-[130px]" src={img} alt={img} />
    </div>
  );
};

export default SubBanner;
