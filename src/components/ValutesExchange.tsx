import { FC } from "react";
import { IExchange } from "../types/types";

interface ValutesEchangeProps {
  exchangeData: IExchange[];
}

const ValutesExchange: FC<ValutesEchangeProps> = ({ exchangeData }) => {
  return (
    <div className="valutes__content">
      <ul className="valutes__content-list">
        <li className="valutes__content-item valutes__content-item_title">
          <div className="valutes__content-item-value valutes__content-item_code">
            Code
          </div>
          <div className="valutes__content-item-value valutes__content-item_rate">
            Rate
          </div>
        </li>
        {exchangeData.map((data) => (
          <li key={data.country} className="valutes__content-item">
            <div className="valutes__content-item-value valutes__content-item_code">
              {data.country}
            </div>
            <div className="valutes__content-item-value valutes__content-item_rate">
              {data.val}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValutesExchange;
