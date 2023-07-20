
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CatsPage from './pages/CatsPage';

function App() {
  return (
    <div className="App">

    <Navbar/>

    <Routes>

    <Route path='/' element={ <HomePage />} />
    <Route path='/cats' element={ <CatsPage /> } />

    </Routes>
    </div>
  );
}

export default App;
