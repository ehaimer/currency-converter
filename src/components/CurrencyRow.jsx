import React from "react"

const CurrencyRow = (props) => {
  const { currencies } = props

  const keys = Object.keys(currencies)
  return (
    <>
      <select>
        {keys.map((key) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </select>
      <input type="number" placeholder="Enter Amount" />
    </>
  )
}

export default CurrencyRow
