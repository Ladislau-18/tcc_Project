import { useEffect, useState } from "react";

import { SearchTCC, TccList }from '../../components/Search/goSearch/goSearch';


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
    <>
        <SearchTCC />
        <TccList />
    </>
  );
}

export default Home;


