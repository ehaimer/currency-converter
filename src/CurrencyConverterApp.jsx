import { useEffect, useState, useRef } from "react"

function CurrencyConverterApp() {
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
      <form
        action="#"
        onSubmit={handleEnter}
        className="w-[300px] my-16 mx-auto h-[350px] rounded-md shadow-all flex flex-col  items-center"
      >
        <h1 className="text-[1.3rem] whitespace-nowrap font-bold text-primary my-8">
          The Currency Converter
        </h1>
        {keys && (
          <div className="flex gap-2">
            <select
              ref={topCountryRef}
              className="rounded-lg p-2 outline-forth text-lg border border-forth w-20 text-forth bg-gray-100 font-bold shadow-all"
            >
              {keys.map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="py-1 px-2 outline-forth text-forth text-lg rounded-sm shadow-allGray w-[10rem]"
              placeholder="Enter Amount"
              onChange={(e) => setTopValue(e.target.value)}
              value={topValue}
            />
          </div>
        )}
        <div className="font-bold text-2xl text-primary my-2">=</div>
        {keys && (
          <div className="flex gap-2 flex-row-reverse">
            <select
              ref={bottomCountryRef}
              className="rounded-lg p-2 outline-forth text-lg border border-forth w-20 text-forth bg-gray-100 font-bold shadow-all"
            >
              {keys.map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="px-2 py-1 outline-forth text-forth text-lg rounded-sm shadow-allGray w-[10rem]"
              placeholder="Enter Amount"
              onChange={(e) => setBottomValue(e.target.value)}
              value={bottomValue}
            />
          </div>
        )}
        <div>
          <button
            type="submit"
            className="shadow-all mt-8 mb-6 mx-2 w-28 h-10 rounded-lg border-none text-xl bg-forth text-white transition-transform hover:scale-105 active:scale-95 font-bold"
          >
            Enter
          </button>
          <button
            type="button"
            className="mt-8 mb-6 mx-2 w-28 h-10 rounded-lg border-none text-xl bg-forth text-white shadow-all transition-transform hover:scale-105 ctive:scale-95 font-bold"
            onClick={() => {
              setBottomValue("", setTopValue(""), setShowNotification(false))
            }}
          >
            New
          </button>
        </div>
        <p
          className={`text-red-500 font-semibold text-center ${
            showNotification
              ? "opacity-1 transition-opacity"
              : "opacity-0 transition-opacity"
          }`}
        >
          Please Enter a valid amount in only one field
        </p>
      </form>
    </main>
  )
}

export default CurrencyConverterApp
