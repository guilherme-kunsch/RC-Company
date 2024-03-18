import { useState } from "react";
import { Buttons } from "./components/Buttons"
import { Header } from "./components/Header"
import { format } from 'date-fns'
import './global.css'

import { LineChart, Line, CartesianGrid, XAxis,YAxis } from 'recharts';
import { useEffect } from "react";
import { Card } from "./components/Card";

export function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const load = async () => {
      const response = await fetch('https://api.thingspeak.com/channels/2468578/feeds.json')
      const responseData = await response.json()
      
      for(const data of responseData.feeds) {
        data.hour = format(data.created_at, 'HH:mm')
      }

      setData(responseData.feeds)
    }
    load()
  }, [])

  return ( 
    <>
    <Header />
    <Card />
    <LineChart width={1000} height={600} data={data}>
      <Line type="monotone" dataKey="field1" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="hour" />
      <YAxis />
    </LineChart>
    </>
  )
}


