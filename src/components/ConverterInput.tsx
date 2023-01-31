import { ChangeEvent, FC, useMemo, useEffect, useState } from "react"
import { useAppDispatch } from "../app/hooks";
import { ISymbols } from "../types/types";

interface ConverterInputProps {
  symbol: string,
  totalSymbols: ISymbols[],
  convertValue: number,
  changeConvert: (arg: string) => void,
  setConvertValue: (arg: number) => void,
  fetchValues: () => void,
  modalOpen: boolean,
  openModal: Function,
  closeModal: Function,
}

const ConverterInput:FC<ConverterInputProps> = ({symbol, convertValue, totalSymbols, changeConvert, setConvertValue, fetchValues, modalOpen, openModal, closeModal}) => {

  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState(convertValue);

  useEffect(() => {
    const t = setTimeout(() => fetchValues(), 500);
    return () => clearTimeout(t);
  }, [convertValue]);

  useMemo(() => {
    setAmount(convertValue);
  }, [convertValue])

  let timer: ReturnType<typeof setTimeout>;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
    if (!+e.target.value && +e.target.value !== 0) return;
    setConvertValue(+e.target.value);
  }

  const handleOpen = () => {
    if (timer) {
      clearInterval(timer);
    } else {
      dispatch(openModal());
    }
  }

  const handleClose = () => {
    timer = setTimeout(() => {
      dispatch(closeModal());
    }, 300)
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
        <button 
          onMouseEnter={() => handleOpen()}
          onMouseLeave={() => handleClose()}
          className="converter-value__content-btn">{symbol}</button>
      </div>
      <div onMouseEnter={handleOpen} onMouseLeave={handleClose} className={modalOpen ? "converter-value__list converter-value__list_active" : "converter-value__list"}>
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