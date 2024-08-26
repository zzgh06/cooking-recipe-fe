import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

interface CopyClipButtonProps {
  recipeDetail? :{
    _id? : string
  }
}


const CopyClipButton = ({ recipeDetail }: CopyClipButtonProps) => {
  // Clipboard API를 통한 Clipboard 구현
  const copyURLToClipboard = async (text:string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("페이지의 주소가 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

  return (
    <div
      onClick={() =>
        // copyURLToClipboard(`http://localhost:3000/recipe/${recipeDetail?._id}`)
        copyURLToClipboard(`https://what-is-your-fridge.netlify.app/recipe/${recipeDetail?._id}`)
      }
    >
      {" "}
      <FontAwesomeIcon icon={faLink} size="lg"/>
    </div>
  );
};

export default CopyClipButton;
