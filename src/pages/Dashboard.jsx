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
} from "recharts";
import { getDatabase, ref, onValue, off, set } from "firebase/database";
import { firestore } from "../services/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";


export function Dashboard() {
  const [ledStatus, setLedStatus] = useState(0);
  const [temperatura, setTemperatura] = useState(null);
  const [umidade, setUmidade] = useState(null);
  const [umidadeAr, setUmidadeAr] = useState(null);
  const [temperaturaAr, setTemperaturaAr] = useState(null);
  const [data, setData] = useState(null);
  const [dataPoints, setDataPoints] = useState([]);
  const [evapotranspiracao, setEvapotranspiracao] = useState(null);

  async function enviarDadosParaFirebase(
    ledStatus,
    temperatura,
    umidade,
    umidadeAr,
    temperaturaAr,
    data
  ) {
    try {
      const dados = {
        ledStatus,
        temperatura,
        umidade,
        umidadeAr,
        temperaturaAr,
        data
      };
      console.log("aqui", dados)
      await addDoc(collection(firestore, "dadosPlantacao"), dados);
      console.log("Dados enviados com sucesso para o Firebase Firestore.", dados);
    } catch (error) {
      console.error("Erro ao enviar dados para o Firebase:", error);
    }
  }

  useEffect(() => {
    async function fetchFirestoreData() {
      try {
        console.log("Fetching data from Firestore...");

        const querySnapshot = await getDocs(
          collection(firestore, "dadosPlantacao")
        );
        const newDataPoints = [];
        let maxTemp = -Infinity;
        let minTemp = Infinity;
        let totalTemp = 0;
        let count = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.temperaturaAr) {
            const temperaturaDoAr = data.temperaturaAr;
            newDataPoints.push({ ...data, id: doc.id });

            if (temperaturaDoAr > maxTemp) {
              maxTemp = temperaturaDoAr;
            }
            if (temperaturaDoAr < minTemp) {
              minTemp = temperaturaDoAr;
            }

            totalTemp += temperaturaDoAr;
            count++;
          }
        });

        console.log("New data points fetched:", newDataPoints);

        const mediaTemp = count > 0 ? totalTemp / count : 0;
        const duracaoDia = 24;
        const evapoTranspiracao = calculaEvapotranspiracao(
          duracaoDia,
          mediaTemp
        ).toFixed(2);

        console.log("Calculated evapotranspiration:", evapoTranspiracao);

        setDataPoints(newDataPoints);
        setEvapotranspiracao(evapoTranspiracao);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }

    }

    function calculaEvapotranspiracao(duracaoDia, mediaTemp) {
      return 0.013 * duracaoDia * (mediaTemp + 17);
    }

    fetchFirestoreData();

    const interval = setInterval(fetchFirestoreData, 300000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const database = getDatabase();

    const dataRef = ref(database, "Data");
    const ledStatusRef = ref(database, "LED_STATUS");
    const temperaturaRef = ref(database, "Temperatura");
    const temperaturaArRef = ref(database, "Temperatura_AR");
    const umidadeRef = ref(database, "Umidade");
    const umidadeArRef = ref(database, "Umidade_AR");


    const handleData = (snapshot) => {
      const value = snapshot.val();

      const refPath = snapshot.ref.toString();

      if (refPath === ledStatusRef.toString()) {
        setLedStatus(value);
      } else if (refPath === temperaturaRef.toString()) {
        setTemperatura(value);
      } else if (refPath === umidadeRef.toString()) {
        setUmidade(value);
      } else if (refPath === umidadeArRef.toString()) {
        setUmidadeAr(value);
      } else if (refPath === temperaturaArRef.toString()) {
        setTemperaturaAr(value);
      } else if (refPath === dataRef.toString()) {
        setData(value);
      }
    };

    onValue(ledStatusRef, handleData);
    onValue(temperaturaRef, handleData);
    onValue(umidadeRef, handleData);
    onValue(umidadeArRef, handleData);
    onValue(temperaturaArRef, handleData);
    onValue(dataRef, handleData);

    return () => {
      off(ledStatusRef, handleData);
      off(temperaturaRef, handleData);
      off(umidadeRef, handleData);
      off(umidadeArRef, handleData);
      off(temperaturaArRef, handleData);
      off(dataRef, handleData);
    };
  }, []);

  const toggleLedStatus = () => {
    const newLedStatus = ledStatus === 0 ? 1 : 0;
    setLedStatus(newLedStatus); // Atualiza o estado local imediatamente

    // Atualiza o valor no Firebase Realtime Database
    const database = getDatabase();
    const ledStatusRef = ref(database, "LED_STATUS");
    set(ledStatusRef, newLedStatus); // Define o novo valor no Firebase
  };

  useEffect(() => {
    if (
      ledStatus !== null &&
      temperatura !== null &&
      umidade !== null &&
      umidadeAr !== null &&
      temperaturaAr !== null &&
      data !== null
    ) {
      enviarDadosParaFirebase(
        ledStatus,
        temperatura,
        umidade,
        umidadeAr,
        temperaturaAr,
        data
      );
    }
  }, [ledStatus, temperatura, umidade, umidadeAr, temperaturaAr, data]);

  return (
    <div>
      <Navbar />
      <div className="mt-4 mb-6 text-center text-white">
        <h1>Dados da Plantação</h1>
        <div className="data-container flex gap-28 justify-center mt-8">
          <div className="data-item">
            <h3>Bomba D'Água:</h3>
            <p>{ledStatus}</p>
          </div>
          <div className="data-item">
            <h3>Temperatura_Solo:</h3>
            <p>{temperatura} °C</p>
          </div>
          <div className="data-item">
            <h3>Umidade_Solo:</h3>
            <p>{umidade} %</p>
          </div>
          <div className="data-item">
            <h3>Umidade_AR:</h3>
            <p>{umidadeAr}</p>
          </div>
          <div className="data-item">
            <h3>Temperatura_AR:</h3>
            <p>{temperaturaAr}</p>
          </div>
          <div className="data-item">
            <h3>Evapotranspiração:</h3>
            <p>{evapotranspiracao}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <ResponsiveContainer width="80%" aspect={4}>
          <LineChart
            data={dataPoints}
            width={730}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="natural" dataKey="umidadeAr" stroke="#1ee3cf" />
            <Line type="natural" dataKey="temperatura" stroke="#6b48ff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center mt-4 text-white">Bomba D'água</p>
      <div className="bg-red-600 w-[9rem] p-2 mx-auto text-center mt-4 text-white rounded hover:bg-red-500">
        <button onClick={toggleLedStatus}>Liga / Desliga</button>
      </div>
    </div>
  );
}
