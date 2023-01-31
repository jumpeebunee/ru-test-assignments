import { FC } from "react"

interface BaseConvertProps {
  baseSymbol: string,
  equalSymbol: string,
  equalValue: number,
}

const BaseConvert:FC<BaseConvertProps> = ({baseSymbol, equalValue, equalSymbol}) => {
  return (
    <div className="base-convert">1 {baseSymbol} = {equalValue} {equalSymbol}</div>
  )
}

export default BaseConvert