import axios from "axios";
import { useEffect, useState, useMemo } from "react"
import { ISymbols } from "../types/types";
import ConverterInput from "./ConverterInput"

const ConverterValue = () => {

  const [convertTo, setConvertTo] = useState('');
  const [convertFrom, setConvertFrom] = useState('');
  const [convertFromValue, setConvertFromValue] = useState(1);
  const [convertToValue, setConvertToValue] = useState(0);
  const [dataSymbols, setDataSymbols] = useState<ISymbols[]>([]);

  const CONVERT_FROM = 'usd';
  const CONVERT_TO = 'rub';

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
      if (!convertFrom && key === CONVERT_FROM) setConvertFrom(CONVERT_FROM);
      if (!convertTo && key === CONVERT_TO) setConvertTo(CONVERT_TO);
      newData.push({abbr: key, country: val});
    }
    setDataSymbols(newData);
  },[])

  const fetchValues = async() => {
    if (convertFrom && convertTo) {
      console.log('Zaprops')
      const resolve = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${convertFrom}/${convertTo}.json`);
      setConvertToValue(convertFromValue * resolve.data[convertTo]);
    }
  }

  useMemo(async () => {
    fetchValues();
  }, [convertTo, convertFrom])

  return (
    <div className="converter-value">
      <div className="converter-value__content">
        <ConverterInput
          symbol={convertFrom}
          setConvertFrom={setConvertFrom}
          setConvertTo={setConvertTo}
          totalSymbols={dataSymbols}
          convertValue={convertFromValue}
          setConverValue={setConvertFromValue}
          fetchValues={fetchValues}
        />
        <button className="converter-value__reverse"></button>
        <ConverterInput
          symbol={convertTo}
          setConvertFrom={setConvertTo}
          setConvertTo={setConvertTo}
          totalSymbols={dataSymbols}
          convertValue={convertToValue}
          setConverValue={setConvertToValue}
          fetchValues={fetchValues}
        />
      </div>
    </div>
  )
}

export default ConverterValue