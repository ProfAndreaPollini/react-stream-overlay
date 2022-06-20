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
      <div className="w-[400px] h-[600px]  bg-slate-900 text-white bg-opacity-50">
        Crypto Tracker

        <CurrenciesRates />
        <CurrencyChart/>
      </div>
    </CurrencyProvider>
  )
}

export default App
