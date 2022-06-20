import React from 'react'
import { useCurrency } from './context';

type Props = {}

const CurrenciesRates = (props: Props) => {

  const {currencies} = useCurrency()

  return (
    <div>
       <table>
        <tbody>
          {currencies?.map((currency, pos) => (
            <tr key={pos} >
            <td>{currency.name}</td>
            <td>{currency.symbol}</td>
            <td><img src={currency.png32} /></td>
            <td>{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(currency.rate)} </td>
          </tr>
        ))}
     </tbody>
      </table>
    </div>
  )
}

export default CurrenciesRates