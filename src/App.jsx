import "./App.css"
import { useEffect, useState, useRef } from "react"

function App() {
  const topCountryRef = useRef()
  const bottomCountryRef = useRef()
  const apiKey = process.env.REACT_APP_API_KEY
  const BASE_URL = "https://api.freecurrencyapi.com/v1/"
  const endpointURL = `${BASE_URL}latest?apikey=${apiKey}`
  const [keys, setKeys] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [topValue, setTopValue] = useState("")
  const [bottomValue, setBottomValue] = useState("")

  useEffect(() => {
    fetch(endpointURL)
      .then((res) => res.json())
      .then((data) => {
        setKeys(Object.keys(data.data))
      })
  }, [])

  const handleEnter = async () => {
    setShowNotification(false)
    const topValueAmount = parseFloat(topValue)
    const bottomValueAmount = parseFloat(bottomValue)
    const topCountry = topCountryRef.current.value
    const bottomCountry = bottomCountryRef.current.value
    if (
      (isNaN(topValueAmount) && isNaN(bottomValueAmount)) ||
      (!isNaN(topValueAmount) && !isNaN(bottomValueAmount))
    ) {
      setShowNotification(true)
    } else {
      setShowNotification(false)
      const URL = `${BASE_URL}latest?apikey=${apiKey}&currencies=${
        !isNaN(topValueAmount) ? bottomCountry : topCountry
      }&base_currency=${!isNaN(topValueAmount) ? topCountry : bottomCountry}`
      console.log(URL)
      const response = await fetch(URL)
      const data = await response.json()
      const filteredData = data.data
      console.log(filteredData)
      if (!isNaN(topValueAmount)) {
        setBottomValue(filteredData[bottomCountry] * topValueAmount)
      } else {
        setTopValue(filteredData[topCountry] * bottomValueAmount)
      }
    }
  }

  return (
    <main>
      <form action="#" onSubmit={handleEnter} className="container">
        <h1>The Currency Converter</h1>
        {keys && (
          <div className="top-row">
            <select ref={topCountryRef}>
              {keys.map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Enter Amount"
              onChange={(e) => setTopValue(e.target.value)}
              value={topValue}
            />
          </div>
        )}
        <div className="equal">=</div>
        {keys && (
          <div className="bottom-row">
            <select ref={bottomCountryRef}>
              {keys.map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Enter Amount"
              onChange={(e) => setBottomValue(e.target.value)}
              value={bottomValue}
            />
          </div>
        )}
        <div>
          <button type="submit">Enter</button>
          <button
            type="button"
            onClick={() => {
              setBottomValue("", setTopValue(""), setShowNotification(false))
            }}
          >
            New
          </button>
        </div>
        <p
          className={`notification ${
            showNotification ? "display-element" : "display-none"
          }`}
        >
          Please Enter a valid amount in only one field
        </p>
      </form>
    </main>
  )
}

export default App
