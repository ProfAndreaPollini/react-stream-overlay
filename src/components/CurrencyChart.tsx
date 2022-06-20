import React, { useEffect, useState } from 'react'
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title);


import { useCurrency } from '../context';

type Props = {}

type ChartData = {
  data: number[],
  borderColor: string,
  backgroundColor: string,

}

const CurrencyChart = (props: Props) => {

  const [chartData, setChartData] = useState<any>({})

  const { rates, currencies } = useCurrency()

  useEffect(() => {
    if (!rates) return
    if (!currencies) return

    if (rates.size === 0) {
      return
    }
    let d = {}
    console.log(rates.get(currencies[0].code), rates.get(currencies[1].code), currencies[0].name, currencies[1].name)
    const datasets: ChartData[] = []
    rates.forEach((rates, code) => {
      const ds = {
        id: code,
        label: code,
        data: rates,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
      console.log(ds)
      datasets.push(ds)
    })
    d = {
      labels: rates.get(currencies[0].code)?.map((x, pos) => pos) || [],
      datasets: datasets || []
    };
    console.log(d)
    setChartData(d)

  }, [rates])

  let dataChartJSX = <div>no data</div>

  if (chartData.datasets && chartData.datasets.length > 0) {
    // const btcData = chartData.map((x: any) => ({
    //   labels: x.labels,
    //   datasets: [x.datasets[0]]
    // }))
    //   console.log("BTC:", btcData)
    const btcData = {
      labels: chartData.labels,
      datasets: chartData.datasets.filter((d: any) => d.id === "BTC")
    }
    const ethData = {
      labels: chartData.labels,
      datasets: chartData.datasets.filter((d: any) => d.id === "ETH")
    }
    dataChartJSX = (<div className="w-80 h-32"><Chart type='line' data={btcData} /><Chart type='line' data={ethData} /></div>)
  }

  return (
    <div>{dataChartJSX}</div>
  )
}

export default CurrencyChart