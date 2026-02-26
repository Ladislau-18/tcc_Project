import { useEffect, useState } from "react";
import axios from "axios";
import DashInfo from "../../components/DashboardComponents/dashboardInfo";

function Home() {
  const [user, setUser] = useState(null);
  const [dados, setDados] = useState({
    totalRelatorios: 0,
    totalAno: 0,
    ocupacao: 0
  });

  useEffect(() => {
    const userStorage = sessionStorage.getItem('user');

    if (userStorage) {
      setUser(JSON.parse(userStorage));
      fetchStats(); // Busca os dados quando o user está logado
    } else {
      alert("Faça o Login Para acessar a esta página");
      window.location.href = '/';
    }
  }, []);

  // Função para buscar os dados reais do banco
  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost/TCC_PROJETO/tcc_back/dashboard/cardsInfo.php');
      setDados(response.data);
    } catch (error) {
      console.error("Erro ao buscar estatísticas dos cards", error);
    }
  };


  return (
    <>
        <DashInfo  dados={dados}/>
    </>
  );
}

export default Home;


