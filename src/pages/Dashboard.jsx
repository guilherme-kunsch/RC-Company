import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { firestore } from "../services/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";


export function Dashboard() {
  const [ledStatus, setLedStatus] = useState(null);
  const [temperatura, setTemperatura] = useState(null);
  const [umidade, setUmidade] = useState(null);

  useEffect(() => {
    const database = getDatabase();

    const ledStatusRef = ref(database, "LED_STATUS");
    const temperaturaRef = ref(database, "Temperatura");
    const umidadeRef = ref(database, "Umidade");

    const handleData = (snapshot) => {
      const value = snapshot.val();
      console.log("Valores recebidos:", value);

      const refPath = snapshot.ref.toString();

      if (refPath === ledStatusRef.toString()) {
        setLedStatus(value);
      } else if (refPath === temperaturaRef.toString()) {
        setTemperatura(value);
      } else if (refPath === umidadeRef.toString()) {
        setUmidade(value);
      }
    };

    // Registrar listeners para atualizar os estados quando os dados mudarem
    onValue(ledStatusRef, handleData);
    onValue(temperaturaRef, handleData);
    onValue(umidadeRef, handleData);

    // Remover os listeners quando o componente for desmontado
    return () => {
      off(ledStatusRef, handleData);
      off(temperaturaRef, handleData);
      off(umidadeRef, handleData);
    };
  }, []);

  async function enviarDadosParaFirebase(ledStatus, temperatura, umidade) {
    try {
      console.log('Dados a serem enviados:', { ledStatus, temperatura, umidade });
      const dados = { ledStatus, temperatura, umidade };
      await addDoc(collection(firestore, 'dadosPlantacao'), dados);
  
      console.log('Dados enviados com sucesso para o Firebase.');
    } catch (error) {
      console.error('Erro ao enviar dados para o Firebase:', error);
    }
  }

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
        
        <button className="text-white mt-6 p-2 bg-slate-700" onClick={() => enviarDadosParaFirebase(ledStatus, temperatura, umidade)}>TESTE</button>
      </div>
    </div>
  );
}
