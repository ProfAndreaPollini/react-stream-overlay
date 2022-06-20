import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react"
import { Currency } from "./types/Currency";


interface ICurrencyCtx {
  currencies: Currency[],
  rates: Map<string, number[]>,
  setCurrencies: (currencies: Currency[]) => void,
}

export const CurrencyContext = createContext<Partial<ICurrencyCtx>>({})
export const useCurrency = () => useContext(CurrencyContext);


export const CurrencyProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [rates, setRates] = useState(new Map<string, number[]>())

  useEffect(() => {
    fetch("https://api.livecoinwatch.com/coins/list", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": import.meta.env.VITE_APP_KEY,
      },
      body: JSON.stringify({
        currency: "EUR",
        sort: "rank",
        order: "ascending",
        offset: 0,
        limit: 2,
        meta: true,
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data))
        setCurrencies(data)
        let map = new Map<string, number[]>()
        data.forEach((currency: Currency) => {
          map.set(currency.code, [currency.rate])
        })
        setRates(map)
      })
  }, [])

  useEffect(() => {
    if (currencies.length === 0) {
      return
    }
    let interval = setInterval(() => {
      fetch("https://api.livecoinwatch.com/coins/list", {
        method: "POST",
        headers: {
          "content-type": "application/json",

          "x-api-key": import.meta.env.VITE_APP_KEY,
        },
        body: JSON.stringify({
          currency: "EUR",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 2,
          meta: true,
        }),
      }).then((res) => res.json())
        .then((data) => {
          setCurrencies(data)
          setRates(values => {
            let map = new Map<string,number[]>()
            data.forEach((currency:Currency )=> {
              let r = values.get(currency.code)
              if (r) {
                r.push(currency.rate)
              } else {
                r = [currency.rate]
              }
              map.set(currency.code, r)
            })
            return map
          })
        })
    }, 30000)
    return () => clearInterval(interval)
  }, [currencies])


  return (
    <CurrencyContext.Provider
      value={{
        currencies,
        setCurrencies,
        rates
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};