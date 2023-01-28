import ConverterInput from "./ConverterInput"

const ConverterValue = () => {

  return (
    <div className="converter-value">
      <div className="converter-value__content">
        <ConverterInput/>
        <button className="converter-value__reverse"></button>
        <ConverterInput/>
      </div>
    </div>
  )
}

export default ConverterValue