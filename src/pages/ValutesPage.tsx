import axios from "axios";
import { useEffect, useState } from "react";
import { IExchange } from "../types/types";
import { exchangeContent } from "../app/feautures/exchangeSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addData } from "../app/feautures/exchangeSlice";
import { baseCurrency } from "../app/feautures/exchangeSlice";
import ValutesExchange from "../components/ValutesExchange";

const ValutesPage = () => {
  const exchangeContentData = useAppSelector(exchangeContent);
  const dispatch = useAppDispatch();

  const currentExchange = useAppSelector(baseCurrency);

  useEffect(() => {
    if (exchangeContentData.length === 0) fetchCurency();
  }, []);

  const fetchCurency = async () => {
    const response = await axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currentExchange}.min.json`
    );
    const data: IExchange = response.data[currentExchange];

    const arrData = [];

    for (let [key, val] of Object.entries(data)) {
      arrData.push({ country: key, val: +Number(val).toFixed(2) });
    }

    dispatch(addData(arrData));
  };

  return (
    <div className="main-page__content">
      <div className="valutes-page__content">
        <p className="valutes-page__description">
          Converts 1 unit of your currency to other currencies. You can change
          your currency on the home page.
        </p>
        <h2>Base currency: {currentExchange}</h2>
      </div>
      <ValutesExchange exchangeData={exchangeContentData} />
    </div>
  );
};

export default ValutesPage;
