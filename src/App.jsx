import "./App.css"
import CurrencyRow from "./components/CurrencyRow"
import { useEffect } from "react"

function App() {
  const apiKey = process.env.REACT_APP_API_KEY
  const baseURL = process.env.REACT_APP_BASE_URL
  const endpointURL = `${baseURL}latest?access_key=${apiKey}`
  console.log(endpointURL)

  useEffect(() => {
    fetch(endpointURL)
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [])

  http: return (
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
