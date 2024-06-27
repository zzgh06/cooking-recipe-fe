import React from "react";

const OrderList = ({totalPrice}) => {

    return(
        <div className="order-list-box">
           <p className="order-list-title">주문 내역</p>
           <div>
                <p>최종 결제금액</p>
                <p className="order-list-price">₩ 4000</p>
            </div> 
            <button>결제하기</button>
        </div>
    );
};

export default OrderList;