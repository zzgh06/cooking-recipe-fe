import React from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

interface CardValue {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focus: 'number' | 'name' | 'expiry' | 'cvc' | undefined;
}

interface PaymentFormProps {
  handleInputFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  cardValue: CardValue;
  handlePaymentInfoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentForm = ({
  handleInputFocus,
  cardValue,
  handlePaymentInfoChange,
}: PaymentFormProps) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
      <div className="flex items-center justify-center h-full">
        <Cards
          cvc={cardValue.cvc}
          expiry={cardValue.expiry}
          focused={cardValue.focus}
          name={cardValue.name}
          number={cardValue.number}
        />
      </div>
      <div className="space-y-4">
        <div>
          <input
            type="tel"
            name="number"
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            maxLength={16}
            value={cardValue.number}
            className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="카드 번호 *"
          />
        </div>
        <div>
          <input
            type="text"
            name="name"
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            value={cardValue.name}
            className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="성명 *"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="expiry"
              onChange={handlePaymentInfoChange}
              onFocus={handleInputFocus}
              required
              maxLength={7}
              value={cardValue.expiry}
              className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="MM/DD *"
            />
          </div>
          <div>
            <input
              type="text"
              name="cvc"
              onChange={handlePaymentInfoChange}
              onFocus={handleInputFocus}
              required
              maxLength={3}
              value={cardValue.cvc}
              className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="CVC *"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
