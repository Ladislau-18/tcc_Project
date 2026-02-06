import { useEffect, useState } from "react";
import Layout from "../../Layout/layout";
import SearchTCC from "../Dashboard/DashboardUser";

function Home(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = sessionStorage.getItem('user');

    if (userStorage) {
      setUser(JSON.parse(userStorage));
    } else {
        alert("Faça o Login Para acessar a esta página");
      window.location.href = '/';
    }
  }, []);


  return (
    <Layout>
        <SearchTCC />
    </Layout>
  );
}

export default Home;


