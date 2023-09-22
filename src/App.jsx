import "./App.css"
// import CurrencyRow from "./components/CurrencyRow"
import { useEffect, useState, useRef } from "react"

function App() {
  const topRef = useRef()
  const bottomRef = useRef()
  const topCountryRef = useRef()
  const bottomCountryRef = useRef()
  const TEMP_LOCAL_STORAGE_KEY = "temp"
  const apiKey = process.env.REACT_APP_API_KEY
  const BASE_URL = "https://api.freecurrencyapi.com/v1/"
  const endpointURL = `${BASE_URL}latest?apikey=${apiKey}`
  const [currencies, setCurrencies] = useState({})
  const [keys, setKeys] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  // const [values, setValues] = useState([])

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

  useEffect(() => {
    setKeys(Object.keys(currencies))
    // setValues(Object.values(currencies))
  }, [currencies])

  const handleEnter = (e) => {
    setShowNotification(false)
    const topValue = parseFloat(topRef.current.value)
    const bottomValue = parseFloat(bottomRef.current.value)
    // const topCountry = topCountryRef.current.value
    // const bottomCountry = topCountryRef.current.value

    if (
      (isNaN(topValue) && isNaN(bottomValue)) ||
      (!isNaN(topValue) && !isNaN(bottomValue))
    ) {
      setShowNotification(true)
    } else {
      setShowNotification(false)
      //  &currencies=EUR&base_currency=BRL
    }
  }


  return (
    <main className="container">
      <h1>The Currency Converter</h1>
      {currencies && (
        <div className="top-row">
          <select ref={topCountryRef}>
            {keys.map((key) => (
              <option value={key} key={key}>
                {key}
              </option>
            ))}
          </select>
          <input type="number" placeholder="Enter Amount" ref={topRef} />
        </div>
      )}
      <div className="equal">=</div>
      {currencies && (
        <div className="bottom-row">
          <select ref={bottomCountryRef}>
            {keys.map((key) => (
              <option value={key} key={key}>
                {key}
              </option>
            ))}
          </select>
          <input type="number" placeholder="Enter Amount" ref={bottomRef} />
        </div>
      )}
      <button onClick={handleEnter}>Enter</button>
      <p
        className={`notification ${
          showNotification ? "display-element" : "display-none"
        }`}
      >
        Please Enter a valid amount in only one field
      </p>
    </main>
  )
}

export default App
