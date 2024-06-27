import React from "react";
import { currencyFormat } from '../../utils/number';

const OrderList = ({totalPrice}) => {

    return(
        <div className="order-list-box">
           <p className="order-list-title">주문 내역</p>
           <div>
                <p>최종 결제금액</p>
                <p className="order-list-price">₩ {currencyFormat(totalPrice)}</p>
            </div> 
            <button>결제하기</button>
        </div>
    );
};

export default OrderList;