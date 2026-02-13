import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/home';
import SearchPage from './pages/searchTCC/pesquisar';
import Layout from './components/Layout/layout';
import Profile from './pages/perfilUser/Perfil'

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />


        <Route element={<Layout />}> 
          <Route path="/pages/home" element={<Home />} />
          <Route path="/pages/pesquisar" element={<SearchPage />} />
          <Route path="/pages/perfil" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
