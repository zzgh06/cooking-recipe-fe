import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import AddressInput from "../component/AddressInput/AddressInput";
import DeliveryEstimate from "../component/DeliveryEstimate/DeliveryEstimate";
import Review from "../component/Review/Review";
import IngredientsDetailSkeleton from "../component/Skeleton/IngredientsDetailSkeleton";
import { useGetIngredient } from "../hooks/Ingredient/useGetIngredient";
import { useAddToCart } from "../hooks/Cart/useAddToCart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Ingredient } from "../types";
import { setToastMessage } from "../redux/commonUISlice";

const preloadImage = (url: string) => {
  const img = new Image();
  img.src = url;
};

interface IngredientDetail extends Ingredient {
  detail: string;
}

const IngredientsDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: ingredientDataById, isLoading: isLoadingById } = useGetIngredient(id || "");
  const data = ingredientDataById as IngredientDetail | undefined;
  const isLoading = isLoadingById;
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();

  const [address, setAddress] = useState("지역을 선택해주세요");
  const [value, setValue] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [containerHeight, setContainerHeight] = useState<number>(400);

  const imageRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (imageRef.current) {
        setContainerHeight(isExpanded ? imageRef.current.offsetHeight : 400);
      }
    };

    if (imageRef.current && imageRef.current.complete) {
      updateHeight();
    } else if (imageRef.current) {
      imageRef.current.addEventListener('load', updateHeight);
    }

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', updateHeight);
      }
    };
  }, [isExpanded]);

  useEffect(() => {
    if (data?._id) {
      preloadImage(data.images[0]);
      if (data.images[1]) preloadImage(data.images[1]);

      const recentlyIngredient = {
        id: data._id,
        name: data.name,
        images: data.images[0],
      };

      const viewedIngredients: Array<{ id: string; name: string; images: string }> =
        JSON.parse(localStorage.getItem("viewedIngredients") || "[]");

      const updatedViewedIngredients = viewedIngredients.filter(
        (item) => item.id !== data._id
      );

      updatedViewedIngredients.unshift(recentlyIngredient);

      localStorage.setItem(
        "viewedIngredients",
        JSON.stringify(updatedViewedIngredients.slice(0, 2))
      );
    }
  }, [data]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      detailsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (newValue === 1) {
      reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addCart = () => {
    if (!user) {
      navigate("/login");
      dispatch(setToastMessage({
        message: "로그인이 필요한 서비스 입니다.",
        status: "error",
      }))
      return;
    }
    if (id) {
      addToCart({ ingredientId: id, qty: 1 });
    } else {
      console.error("Ingredient ID is missing");
    }
  };

  const goHome = () => {
    navigate("/");
  };

  const calculateDiscountedPrice = (price: number, discountRate = 0): number => {
    const discountedPrice = price * (1 - discountRate / 100);
    return Math.floor(discountedPrice);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const optimizedImageUrl = (url: string) =>
    url.replace(/\/upload\//, "/upload/c_fill,h_1100,w_1100,f_webp/");

  if (isLoading) {
    return <IngredientsDetailSkeleton />;
  }

  return (
    <>
      {data?._id ? (
        <div className="container mx-auto py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="text-center">
              <img
                src={optimizedImageUrl(data.images[0])}
                alt={data.name}
                className="mx-auto max-h-[650px]"
                fetchPriority="high"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
              <div className="text-2xl font-bold text-red-500">
                {data.discountPrice ? (
                  <>
                    {`${data.discountPrice}% `}
                    {currencyFormat(calculateDiscountedPrice(data.price || 0, data.discountPrice))} 원
                  </>
                ) : (
                  <>
                    {currencyFormat(data.price || 0)} 원
                  </>
                )}
              </div>
              <p className="mt-4 text-lg">{data.description}</p>
              <div className="mt-8 border-t pt-4">
                <p className="text-gray-600">배송안내</p>
                <p className="text-xl font-semibold">{address}</p>
                <AddressInput setAddress={setAddress} />
                <DeliveryEstimate address={address} />
              </div>
              <button
                className="mt-4 w-full bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600 transition disabled:opacity-50"
                onClick={addCart}
                disabled={isAdding}
              >
                카트에 담기
              </button>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex border-b border-gray-500">
              <button
                className={`py-2 px-4 text-lg font-bold transition-colors duration-300 ${value === 0
                  ? "border-b-2 border-green-700 text-green-700"
                  : "text-gray-500 hover:text-green-500"
                  }`}
                onClick={(e) => handleChange(e, 0)}
              >
                상세정보
              </button>
              <button
                className={`py-2 px-4 text-lg font-bold transition-colors duration-300 ${value === 1
                  ? "border-b-2 border-green-700 text-green-700"
                  : "text-gray-500 hover:text-green-500"
                  }`}
                onClick={(e) => handleChange(e, 1)}
              >
                리뷰
              </button>
            </div>
            <div ref={detailsRef} className="mt-8">
              <div className="overflow-hidden transition-all" style={{ height: containerHeight }}>
                {data.images[1] ? (
                  <>
                    <img
                      ref={imageRef}
                      src={optimizedImageUrl(data.images[1])}
                      alt={data.name}
                      className="block mx-auto"
                      loading="lazy"
                    />
                    {!isExpanded && (
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
                    )}
                  </>
                ) : (
                  <div className="flex justify-center p-8">
                    <h3 className="text-2xl">상세 이미지가 없습니다. 😅</h3>
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className={`py-2 px-4 w-full max-w-sm ${isExpanded ? "border" : "bg-green-700 text-white"} rounded`}
                  onClick={toggleExpand}
                >
                  {isExpanded ? "간략히 보기" : "상품 상세 더보기"}
                </button>
              </div>
              <p className="mt-4 text-lg">{data.detail}</p>
            </div>
            <div ref={reviewsRef}>
              <Review type="ingredient" itemId={data._id} />
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto my-32 flex flex-col items-center">
          <h2 className="text-4xl">해당 상품이 존재하지 않습니다. 😅</h2>
          <button
            className="mt-8 w-full max-w-xl py-2 px-4 border rounded"
            onClick={goHome}
          >
            홈으로 이동
          </button>
        </div>
      )}
    </>
  );
};

export default IngredientsDetail;
