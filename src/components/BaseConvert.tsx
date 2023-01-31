import { FC } from "react"

interface BaseConvertProps {
  baseSymbol: string,
  equalSymbol: string,
  equalValue: number,
}

const BaseConvert:FC<BaseConvertProps> = ({baseSymbol, equalValue, equalSymbol}) => {
  return (
    <div className="converter-value__description">1 {baseSymbol} = {equalValue} {equalSymbol}</div>
  )
}

export default BaseConvert