import "./App.css"
import CurrencyRow from "./components/CurrencyRow"

function App() {
  const apiKey = process.env.REACT_APP_API_KEY
  const baseURL = process.env.REACT_APP_BASE_URL

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
