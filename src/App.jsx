import "./App.css"
import CurrencyRow from "./components/CurrencyRow"
import { useEffect, useState } from "react"

function App() {
  const apiKey = process.env.REACT_APP_API_KEY
  const BASE_URL = "https://api.freecurrencyapi.com/v1/"
  const endpointURL = `${BASE_URL}latest?apikey=${apiKey}`
  console.log(endpointURL)
  //  &currencies=EUR%2CUSD%2CCAD&base_currency=BRL

  const[currencies, setCurrencies] = useState({})

  useEffect(() => {
    fetch(endpointURL)
      .then((res) => res.json())
      .then((data) => setCurrencies(data.data))
  }, [])

  useEffect(() => {
    const keys = Object.keys(currencies)
    keys.map(key => console.log(key, currencies[key]))
    const values = Object.values(currencies)
    values.map(value => console.log(value))
    for(let key in currencies) {
      console.log(key, currencies[key])
    }
  }, [currencies])

  return (
    <main className="container">
      <h1>The Currency Converter</h1>
      <div className="from-row">
        <CurrencyRow />
      </div>
      <div className="equal">=</div>
      <div className="to-row">
        <CurrencyRow />
      </div>
    </main>
  )
}

export default App
