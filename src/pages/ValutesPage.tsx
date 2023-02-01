import axios from "axios"
import { useEffect, useState } from "react"
import { IExchange } from "../types/types";
import { exchangeContent } from "../app/feautures/exchangeData";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addData } from "../app/feautures/exchangeData";
import ValutesExchange from "../components/ValutesExchange";

const ValutesPage = () => {

  const CURENCY_EXCHANGE = 'rub';

  const exchangeContentData = useAppSelector(exchangeContent);
  const dispatch = useAppDispatch();

  const [currentExchange, setCurrentExchange] = useState(CURENCY_EXCHANGE);

  useEffect(()  => {
    if (exchangeContentData.length === 0) fetchCurency();
  }, []);

  const fetchCurency = async() => {
    const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currentExchange}.min.json`);
    const data: IExchange = response.data[currentExchange];

    const arrData = [];

    for (let [key,val] of Object.entries(data)) {
      arrData.push({country: key, val: +Number(val).toFixed(2)});
    }

    dispatch(addData(arrData));
  }

  const handleChange = (arg: string) => {
    setCurrentExchange(arg);
    fetchCurency();
  }

  return (
    <div className="main-page__content">
      <div className="valutes-page__content">
        <p className="valutes-page__description">Converts 1 unit of your currency to other currencies, you can click on the selected currency in the list to change it.</p>
        <h2>Your current exchange: {currentExchange}</h2>
      </div>
      <ValutesExchange
        exchangeData={exchangeContentData}
        handleChange={handleChange}
      />
    </div>
  )
}

export default ValutesPage