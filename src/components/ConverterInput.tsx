import { ChangeEvent, FC, useMemo, useEffect, useState } from "react"
import { ISymbols } from "../types/types";

interface ConverterInputProps {
  symbol: string,
  totalSymbols: ISymbols[],
  convertValue: number,
  setConvertFrom: (arg: string) => void,
  setConvertTo: (arg: string) => void,
  setConverValue: (arg: number) => void,
  fetchValues: () => void,
}

const ConverterInput:FC<ConverterInputProps> = ({symbol, convertValue, totalSymbols, setConvertFrom, setConvertTo, setConverValue,fetchValues}) => {

  const [amount, setAmount] = useState(convertValue);

  useEffect(() => {
    const t = setTimeout(() => fetchValues(), 500);
    return () => clearTimeout(t);
  }, [convertValue]);

  useMemo(() => {
    setAmount(convertValue);
  }, [convertValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
    if (!+e.target.value && +e.target.value !== 0) return;
    setConverValue(+e.target.value);
  }

  const changeCurrentAbbr = (abbr: string) => {
    if (abbr !== symbol) setConvertFrom(abbr);
  }

  return (
    <div>
      <div className="converter-value__content-input-wrapper">
        <input
          value={convertValue}
          onChange={(e) => handleChange(e)}
          maxLength={15}
          className="converter-value__content-input"
        />
        <button className="converter-value__content-btn">{symbol}</button>
      </div>
      <div className="converter-value__list">
        {totalSymbols.map(sym => 
          <button 
            key={sym.abbr}
            onClick={() => changeCurrentAbbr(sym.abbr)}
          >{sym.abbr}</button>
        )}
      </div>
    </div>
  )
}

export default ConverterInput