import "./App.css"
import CurrencyRow from "./components/CurrencyRow"
import { useEffect, useState } from "react"

function App() {
  const TEMP_LOCAL_STORAGE_KEY = "temp"
  const apiKey = process.env.REACT_APP_API_KEY
  const BASE_URL = "https://api.freecurrencyapi.com/v1/"
  const endpointURL = `${BASE_URL}latest?apikey=${apiKey}`

  const [currencies, setCurrencies] = useState({})

  useEffect(() => {
    setCurrencies(
      JSON.parse(localStorage.getItem(TEMP_LOCAL_STORAGE_KEY)) ||
        fetch(endpointURL)
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem(
              TEMP_LOCAL_STORAGE_KEY,
              JSON.stringify(data.data)
            )
            return data.data
          })
    )
  }, [])

  //  &currencies=EUR%2CUSD%2CCAD&base_currency=BRL

  return (
    <main className="container">
      <h1>The Currency Converter</h1>
      {currencies && (
        <div className="from-row">
          <CurrencyRow currencies={currencies} />
        </div>
      )}
      <div className="equal">=</div>
      {currencies && (
        <div className="to-row">
          <CurrencyRow currencies={currencies} />
        </div>
      )}
    </main>
  )
}

export default App
