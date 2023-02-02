import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { ISymbols } from "../types/types";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { isOpenFromModal, isOpenToModal } from "../app/feautures/modalSlice";
import {
  openFrom,
  openTo,
  closeTo,
  closeFrom,
} from "../app/feautures/modalSlice";
import { data } from "../data/data";
import { baseCurrency } from "../app/feautures/exchangeSlice";
import { changeCurrency } from "../app/feautures/exchangeSlice";
import ConverterInput from "./ConverterInput";
import BaseConvert from "./BaseConvert";

const ConverterValue = () => {
  const CONVERT_TO = "usd";

  const dispatch = useAppDispatch();
  const isOpenFrom = useAppSelector(isOpenFromModal);
  const isOpenTo = useAppSelector(isOpenToModal);
  const currencyExchange = useAppSelector(baseCurrency);

  const [convertTo, setConvertTo] = useState(CONVERT_TO);
  const [convertFrom, setConvertFrom] = useState(currencyExchange);
  const [convertFromValue, setConvertFromValue] = useState(1);
  const [convertToValue, setConvertToValue] = useState(0);
  const [standartConvert, setStandartConvert] = useState(0);
  const [dataSymbols, setDataSymbols] = useState<ISymbols[]>([]);

  useEffect(() => {
    const newData = [];
    for (let [key, val] of Object.entries(data.symbols)) {
      newData.push({ abbr: key, country: val });
    }
    setDataSymbols(newData);
  }, []);

  useMemo(() => {
    fetchValues();
  }, [convertTo, convertFrom]);

  async function fetchValues() {
    if (convertFrom && convertTo) {
      const resolve = await axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${convertFrom}/${convertTo}.json`
      );
      setStandartConvert(+resolve.data[convertTo].toFixed(2));
      setConvertToValue(
        +(convertFromValue * resolve.data[convertTo]).toFixed(2)
      );
    }
  }

  const handleReverse = () => {
    let [from, to] = [convertTo, convertFrom];
    setConvertFrom(from);
    setConvertTo(to);
  };

  const changeConvertFrom = (abbr: string) => {
    if (convertTo === abbr) {
      setConvertTo(convertFrom);
    }
    dispatch(changeCurrency(abbr));
    setConvertFrom(abbr);
  };

  const changeConvertTo = (abbr: string) => {
    if (convertFrom === abbr) {
      setConvertFrom(convertTo);
    }
    setConvertTo(abbr);
  };

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
          modalOpen={isOpenFrom}
          openModal={openFrom}
          closeModal={closeFrom}
        />
        <button
          onClick={handleReverse}
          className="converter-value__reverse"
        ></button>
        <ConverterInput
          symbol={convertTo}
          changeConvert={changeConvertTo}
          totalSymbols={dataSymbols}
          convertValue={convertToValue}
          setConvertValue={setConvertToValue}
          fetchValues={fetchValues}
          modalOpen={isOpenTo}
          openModal={openTo}
          closeModal={closeTo}
        />
      </div>
      <BaseConvert
        baseSymbol={convertFrom}
        equalSymbol={convertTo}
        equalValue={standartConvert}
      />
      <p className="converter-value__description">
        The online currency converter is a tool that will allow you to calculate
        the ratios of the current exchange rates of funds around the world for
        today.
      </p>
    </div>
  );
};

export default ConverterValue;
