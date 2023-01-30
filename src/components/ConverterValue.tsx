import axios from "axios";
import { useEffect, useState, useMemo } from "react"
import { ISymbols } from "../types/types";
import ConverterInput from "./ConverterInput"

const ConverterValue = () => {

  const CONVERT_FROM = 'usd';
  const CONVERT_TO = 'rub';

  const [convertTo, setConvertTo] = useState(CONVERT_FROM);
  const [convertFrom, setConvertFrom] = useState(CONVERT_TO);
  const [convertFromValue, setConvertFromValue] = useState(1);
  const [convertToValue, setConvertToValue] = useState(0);
  const [dataSymbols, setDataSymbols] = useState<ISymbols[]>([]);

  const data = {
    "success": true,
    "symbols": {
      "usd": "United States dollar",
      "rub": "Russian ruble",
      "eur": "Euro",
      "chf": "Swiss franc",
      "gbp": "Pound sterling",
      "jpy": "Japanese yen",
      "uah": "Ukrainian hryvnia",
      "kzt": "Kazakhstani tenge",
      "byn": "New Belarusian Ruble",
      "try": "Turkish lira",
      "cny": "Chinese Yuan",
      "pln": "Poland złoty",
    }
  }

  useEffect(() => {
    const newData = [];
    for (let [key,val] of Object.entries(data.symbols)) {
      newData.push({abbr: key, country: val});
    }
    setDataSymbols(newData);
  },[])

  useMemo(async () => {
    if (convertFrom === convertTo) {
      console.log('yes!')
    }
    fetchValues();
  }, [convertTo, convertFrom])

   async function fetchValues () {
    if (convertFrom && convertTo) {
      const resolve = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${convertFrom}/${convertTo}.json`);
      setConvertToValue(convertFromValue * resolve.data[convertTo]);
    }
  }

  const changeConvertFrom = (abbr: string) => {
    if (convertTo === abbr) {
      setConvertTo(convertFrom);
    }
    setConvertFrom(abbr);
  }

  const changeConvertTo = (abbr: string) => {
    if (convertFrom === abbr) {
      setConvertFrom(convertTo);
    }
    setConvertTo(abbr);
  }

  return (
    <div className="converter-value">
      <div className="converter-value__content">
        <ConverterInput
          symbol={convertFrom}
          changeConvert={changeConvertFrom}
          totalSymbols={dataSymbols}
          convertValue={convertFromValue}
          setConvertValue={setConvertFromValue}
          fetchValues={fetchValues}
        />
        <button className="converter-value__reverse"></button>
        <ConverterInput
          symbol={convertTo}
          changeConvert={changeConvertTo}
          totalSymbols={dataSymbols}
          convertValue={convertToValue}
          setConvertValue={setConvertToValue}
          fetchValues={fetchValues}
        />
      </div>
    </div>
  )
}

export default ConverterValue