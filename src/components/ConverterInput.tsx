import { ChangeEvent, FC, useMemo, useEffect, useState } from "react"
import { ISymbols } from "../types/types";

interface ConverterInputProps {
  symbol: string,
  totalSymbols: ISymbols[],
  convertValue: number,
  changeConvert: (arg: string) => void,
  setConvertValue: (arg: number) => void,
  fetchValues: () => void,
}

const ConverterInput:FC<ConverterInputProps> = ({symbol, convertValue, totalSymbols, changeConvert, setConvertValue,fetchValues}) => {

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
    setConvertValue(+e.target.value);
  }

  return (
    <div className="converter-value__input">
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
            className="converter-value__btn"
            key={sym.abbr}
            onClick={() => changeConvert(sym.abbr)}
          >{sym.abbr.toUpperCase()} <span></span></button>
        )}
      </div>
    </div>
  )
}

export default ConverterInput