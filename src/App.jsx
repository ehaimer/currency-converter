import "./App.css"
import CurrencyRow from "./components/CurrencyRow"
import { useEffect, useState, useRef } from "react"

function App() {
  const topRef = useRef()
  const bottomRef = useRef()
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

  const handleEnter = (topCounter, topAmount, bottomCounter, bottomAmount) => {
    console.log(topCounter, topAmount, bottomCounter, bottomAmount)
  }

  //  &currencies=EUR&base_currency=BRL

  return (
    <main className="container">
      <h1>The Currency Converter</h1>
      {currencies && (
        <div className="top-row">
          <CurrencyRow currencies={currencies} />
        </div>
      )}
      <div className="equal">=</div>
      {currencies && (
        <div className="bottom-row">
          <CurrencyRow currencies={currencies} />
        </div>
      )}
      <button onClick={handleEnter}>Enter</button>
    </main>
  )
}

export default App
