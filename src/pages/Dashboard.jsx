import React, { useState, useEffect } from "react";

import { Navbar } from "../components/Navbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { getDatabase, ref, onValue, off, query } from "firebase/database";
import { firestore } from "../services/firebaseConfig";
import { collection, addDoc, doc, getDocs } from "firebase/firestore";

export function Dashboard() {
  const [ledStatus, setLedStatus] = useState(null);
  const [temperatura, setTemperatura] = useState(null);
  const [umidade, setUmidade] = useState(null);
  const [dataPoints, setDataPoints] = useState([]); 

  async function enviarDadosParaFirebase(ledStatus, temperatura, umidade) {
    try {
      const dados = { ledStatus, temperatura, umidade };
      await addDoc(collection(firestore, "dadosPlantacao"), dados);

      console.log("Dados enviados com sucesso para o Firebase.");
    } catch (error) {
      console.error("Erro ao enviar dados para o Firebase:", error);
    }
  }

  useEffect(() => {
    async function fetchFirestoreData() {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "dadosPlantacao")
        );
        const newDataPoints = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.hasOwnProperty("temperatura") &&
            data.hasOwnProperty("umidade")
          ) {
            const { temperatura, umidade } = data;
            newDataPoints.push({ temperatura, umidade });
          }
          const limitDataPoints = newDataPoints.slice(-30)
          setDataPoints(limitDataPoints);
        });
      } catch (error) {
        console.error("Erro ao buscar dados do Firestore:", error);
      }
    }

    fetchFirestoreData();
  }, []);

  useEffect(() => {
    const database = getDatabase();

    const ledStatusRef = ref(database, "LED_STATUS");
    const temperaturaRef = ref(database, "Temperatura");
    const umidadeRef = ref(database, "Umidade");

    const handleData = (snapshot) => {
      const value = snapshot.val();

      const refPath = snapshot.ref.toString();

      if (refPath === ledStatusRef.toString()) {
        setLedStatus(value);
      } else if (refPath === temperaturaRef.toString()) {
        setTemperatura(value);
      } else if (refPath === umidadeRef.toString()) {
        setUmidade(value);
      }
    };

    onValue(ledStatusRef, handleData);
    onValue(temperaturaRef, handleData);
    onValue(umidadeRef, handleData);

    return () => {
      off(ledStatusRef, handleData);
      off(temperaturaRef, handleData);
      off(umidadeRef, handleData);
    };
  }, []);

  useEffect(() => {
    if (ledStatus !== null && temperatura !== null && umidade !== null) {
      enviarDadosParaFirebase(ledStatus, temperatura, umidade);
    }
  }, [ledStatus, temperatura, umidade]);

  return (
    <div>
      <Navbar />
      <div className="mt-4 text-center text-white">
        <h1>Dados da Plantação</h1>
        <div className="data-container flex gap-28 justify-center mt-8">
          <div className="data-item">
            <h3>LED Status:</h3>
            <p>{ledStatus}</p>
          </div>
          <div className="data-item">
            <h3>Temperatura:</h3>
            <p>{temperatura} °C</p>
          </div>
          <div className="data-item">
            <h3>Umidade:</h3>
            <p>{umidade} %</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      <ResponsiveContainer width="80%" aspect={3}>
        <LineChart 
          data={dataPoints} 
          width={730}
          height={250}
          margin={{
            top: 5,
            right: 30,
            left:  20,
            bottom: 5
          }}
          >
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey="data"/>
          <YAxis dataKey="temperatura"/>
          <Tooltip />
          <Legend />
          <Line type="natural" dataKey="umidade" stroke="#1ee3cf" activeDot={{ r: 8 }}/>
          <Line type="natural" dataKey="temperatura" stroke="#6b48ff" />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
