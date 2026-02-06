import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Log/Login/Login';
import Register from './components/Log/Register/Register';
import Home from './components/pages/Home/home';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/cadastro" element={<Register/>} />
        <Route path="/pages/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
