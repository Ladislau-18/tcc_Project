import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/home';
import SearchPage from './pages/searchTCC/pesquisar';
import Layout from './components/Layout/layout';
import Profile from './pages/perfilUser/perfil'
import Catalog from './pages/catalog/catalog'

function App() {
  return (
    <>
    <Toaster position="top-right"/>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />


        <Route element={<Layout />}> 
          <Route path="/pages/home" element={<Home />} />
          <Route path="/pages/pesquisar" element={<SearchPage />} />
          <Route path="/pages/perfil" element={<Profile />} />
          <Route path="/pages/catalog" element={<Catalog />} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
