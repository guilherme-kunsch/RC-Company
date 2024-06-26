import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { FaArrowLeft, FaArrowRight, FaSearch, FaFileExcel } from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../services/firebaseConfig";
import * as XLSX from 'xlsx';

// currentPage é o número atual da página
// itemsPerPage quantos itens vamos exibir na página
// indexOfLastItem e indexOfFirstItem, são calculados com base na página atual
function PaginationTable({ dataPoints, currentPage, setCurrentPage, itemsPerPage }) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataPoints.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <table className="mt-8 w-3/4 mx-auto bg-slate-700 rounded-md">
        <thead className="text-white">
          <tr>
            <th>Bomba D'Água</th>
            <th>Temperatura Solo</th>
            <th>Umidade Solo</th>
            <th>Temperatura Ar</th>
            <th>Umidade Ar</th>
            <th>Evapotranspiração</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {currentItems.map((dados, index) => (
            <tr key={index}>
              <td className="text-center">{dados.ledStatus}</td>
              <td className="text-center">{dados.temperatura}</td>
              <td className="text-center">{dados.temperaturaAr}</td>
              <td className="text-center">{dados.umidadeAr}</td>
              <td className="text-center">{dados.umidade}</td>
              <td className="text-center">5</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={nextPage}
          disabled={indexOfLastItem >= dataPoints.length}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

function ExportToExcel({ data, fileName, sheetName }) {
  const handleExportToExcel = () => {
    if (data && data.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || 'Sheet1');
      XLSX.writeFile(workbook, fileName + '.xlsx');
    } else {
      console.error("Nenhum dado para exportar para o Excel.");
    }
  };

  return (
    <button
      className="rounded-md text-white flex items-center justify-center bg-green-500 w-20 h-10 hover:bg-green-400"
      onClick={handleExportToExcel}
    >
      <FaFileExcel />
    </button>
  );
}

export function Historic() {
  const [dateInitial, setDateInitial] = useState("");
  const [dateFinal, setDateFinal] = useState("");
  const [dataPoints, setDataPoints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searched, setSearched] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(firestore, "dadosPlantacao"));
        const newDataPoints = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setDataPoints(newDataPoints);
      } catch (error) {
        console.error("Erro ao buscar no firestore", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchFilteredData() {
      if (!dateInitial || !dateFinal) return;

      try {
        const startDate = new Date(dateInitial);
        const endDate = new Date(dateFinal);

        const q = query(
          collection(firestore, "dadosPlantacao"),
          where("date", ">=", startDate),
          where("date", "<=", endDate)
        );

        const querySnapshot = await getDocs(q);
        const filteredDataPoints = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setDataPoints(filteredDataPoints);
      } catch (error) {
        console.error("Erro ao buscar no firestore", error);
      }
    }
    if (searched) {
      fetchFilteredData();
    }
  }, [searched, dateInitial, dateFinal]);

  function handleSearch() {
    setSearched(true);
    setCurrentPage(1);
  }

  return (
    <div>
      <Navbar />
      <div className="mt-8 w-3/4 mx-auto bg-slate-700 p-4 rounded-md">
        <div className="text-white font-bold text-2xl text-center">
          <h1>Gerar Relatório</h1>
        </div>
        <div className="flex justify-between mt-8 p-2">
          <div className="flex justify-between w-[50%]">
            <input
              className="rounded-md h-10"
              type="date"
              onChange={(e) => setDateInitial(e.target.value)}
            />
            <input
              className="rounded-md h-10"
              type="date"
              onChange={(e) => setDateFinal(e.target.value)}
            />
          </div>
          <div className="flex gap-20 justify-end w-[30%]">
            <button
              className="rounded-md text-white flex items-center justify-center bg-green-500 w-20 h-10 hover:bg-green-400"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
            {searched && (
              <ExportToExcel data={dataPoints} fileName="Dados" sheetName="Meus dados" />
            )}
          </div>
        </div>
      </div>
      {searched && (
        <PaginationTable
          dataPoints={dataPoints}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
}
