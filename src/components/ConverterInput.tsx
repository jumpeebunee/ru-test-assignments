import { ChangeEvent, useState } from "react"

const ConverterInput = () => {

  const [amount, setAmount] = useState(1);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => { 
    if (!+e.target.value) return;
    setAmount(+e.target.value);
  }

  return (
    <div className="converter-value__content-input-wrapper">
      <input
        value={amount}
        onChange={(e) => handleChange(e)}
        maxLength={7}
        className="converter-value__content-input"
      />
      <button className="converter-value__content-btn">USD</button>
    </div>
  )
}

export default ConverterInput