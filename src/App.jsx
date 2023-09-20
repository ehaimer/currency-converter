import "./App.css"
import CurrencyRow from "./components/CurrencyRow"

function App() {
  const apiKey = process.env.REACT_APP_API_KEY
  const baseURL = process.env.REACT_APP_BASE_URL

  return (
    <main className="container">
      <CurrencyRow />
    </main>
  )
}

export default App
