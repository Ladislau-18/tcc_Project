import { useEffect, useState } from "react";
import axios from "axios";
import DashInfo from "../../components/DashboardComponents/dashboardInfo";
import { toast } from 'react-hot-toast'


function Home() {
  const [user, setUser] = useState(null);
  const [dados, setDados] = useState({
    totalRelatorios: 0,
    totalAno: 0,
    ocupacao: 0
  });
  const [graphData, setGraphData] = useState({ barData: [], circleData: [] });

  useEffect(() => {
    const userStorage = sessionStorage.getItem('user');

    if (userStorage) {
      setUser(JSON.parse(userStorage));
      fetchDados(); 
    } else {
      toast.error("Faça o Login Para acessar a esta página");
      window.location.href = '/';
    }
  }, []);

  // Função para buscar os dados reais do banco ...
  const fetchDados = async () => {
    try {
      const resCards = await axios.get('http://localhost/TCC_PROJETO/tcc_back/dashboard/cardsInfo.php');
      setDados(resCards.data);


      //Função para pegar os dados de gráficos do banco ...
      const resGraphs = await axios.get('http://localhost/TCC_PROJETO/tcc_back/dashboard/grafics.php');
      setGraphData(resGraphs.data);
    } 
    catch (error) {
      toast.error("Erro ao buscar estatísticas dos cards", error);
    }
  };


  


  return (
    <>
    <h1>Dashboard Administrativo</h1>
    <p><strong>Visão geral do sistema e dados estatísticos.</strong></p>
        <DashInfo  dados={dados} graphData={graphData}/>
    </>
  );
}

export default Home;


