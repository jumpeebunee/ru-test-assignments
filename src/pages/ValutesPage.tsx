import axios from "axios"
import { useEffect } from "react"
import { IExchange } from "../types/types";
import { exchangeContent } from "../app/feautures/exchangeData";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addData } from "../app/feautures/exchangeData";
import ValutesExchange from "../components/ValutesExchange";

const ValutesPage = () => {

  const CURENCY_EXCHANGE = 'rub';

  const exchangeContentData = useAppSelector(exchangeContent);
  const dispatch = useAppDispatch();

  useEffect(()  => {
    if (exchangeContentData.length === 0) fetchCurency();
  }, []);

  const fetchCurency = async() => {
    const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${CURENCY_EXCHANGE}.min.json`);
    const data: IExchange = response.data[CURENCY_EXCHANGE];

    const arrData = [];

    for (let [key,val] of Object.entries(data)) {
      arrData.push({country: key, val: +Number(val).toFixed(2)});
    }

    dispatch(addData(arrData));
  }

  return (
    <div className="main-page__content">
      <ValutesExchange
        exchangeData={exchangeContentData}
      />
    </div>
  )
}

export default ValutesPage