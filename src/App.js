import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Userlogin from './components/Userlogin';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Project from './pages/Project';
import { useContext } from 'react';
import { isAuthTokenContext } from './context/ContextShare';

function App() {
  const{isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
  console.log(isAuthToken);
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Userlogin/>} />
          <Route path='/register' element={<Userlogin register />} />
          <Route path='/dashboard' element={isAuthToken?<Dashboard dashboard/>:<Home />} />
          <Route path='/project' element={<Project/>} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
