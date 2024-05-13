import React from "react";
import { Navbar } from "../components/Navbar";

export function Home() {
  return (
    <div>
      <Navbar />
      <div className="mt-8 w-3/4 mx-auto bg-slate-700 px-12 py-6 rounded-md text-white ">
        <div className="text-center font-bold text-2xl">
          <h1>Projeto Interdisciplinar 3</h1>
          <h2 className="text-center text-lg">Projeto Extensionista Agricultura Inteligente - Fertirrigação</h2>
        </div>
        <div className="mt-4">
          <p className="font-bold mt-4">O que é Fertirrigação?</p>
          <p>A fertirrigação é um método de adubar a lavoura por meio da irrigação. Sendo assim, consiste em um processo que acelera a chegada dos fertilizantes até as raízes das plantas.</p>
          <ul className="mt-4 list-disc list-inside">
            Benefícios da fertirrigação
            <li>Aumento da produtividade</li>
            <li>Melhora da qualidade de vida da vegetação</li>
            <li>Distribuição mais homogênea de nutrientes na plantação</li>
            <li>Diminuição de danos ao solo e à plantação</li>
          </ul>
          <a className="underline" href="https://www.agriq.com.br/fertirrigacao/#O_que_e_fertirrigacao_Quais_sao_seus_beneficios" target="_blank" rel="noopener noreferrer">Mais informações</a>
        </div>
      </div>

      <div className="mt-8 w-3/4 mx-auto bg-slate-700 px-12 py-6 rounded-md text-white">
        <div className="text-center font-bold text-2xl">Método de Blaney-Criddle</div>
        <p className="font-bold mt-4">O que é esse método e como se aplica?</p>
        <p>O método Blaney-Criddle estima a evapotraspiração potencial com base na temperatura média do ar e na duração do dia.</p>
        <p className="font-bold">A fórmula principal é: ETP = 0,013 * D * (T +17)</p>
        <p>Onde ETP é a evapotranspiração potencial em mm/dia, D é a duração do dia em horas, e a T é a temperatura média do ar em °C</p>
      </div>
    </div>

  );
  
};

