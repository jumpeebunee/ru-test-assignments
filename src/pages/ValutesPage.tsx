import axios from "axios"
import { useEffect, useState } from "react"
import ValutesExchange from "../components/ValutesExchange";
import { IExchange, ISymbols } from "../types/types";

const ValutesPage = () => {

  const CURENCY_EXCHANGE = 'eur';

  const [exchangeData, setExchangeData] = useState<IExchange[]>([]);

  useEffect(()  => {
    fetchCurency();
  }, [])

  const fetchCurency = async() => {
    const response = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.min.json');
    const data: IExchange = response.data[CURENCY_EXCHANGE];

    const arrData = [];

    for (let [key,val] of Object.entries(data)) {
      arrData.push({country: key, val: +Number(val).toFixed(2)});
    }

    setExchangeData(arrData);
  }

  return (
    <div className="main-page__content">
      <ValutesExchange
        exchangeData={exchangeData}
      />
    </div>
  )
}

export default ValutesPage