import React, { useEffect, useState } from 'react'

import { Currency } from './types/Currency';
import { CurrencyProvider } from "./context"
import CurrenciesRates from './CurrenciesRates';
import CurrencyChart from './components/CurrencyChart';


function App() {
  // const [currencies, setCurrencies] = useState<Currency[]>([])
  // const [rates, setRates] = useState(new Map<string, number[]>())


  return (
    <CurrencyProvider>
      <div className="w-[1920px] h-[1080px] p-32">
        Crypto Tracker

        <CurrenciesRates />
        <CurrencyChart/>
      </div>
    </CurrencyProvider>
  )
}

export default App
