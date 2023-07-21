
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CatsPage from './pages/CatsPage';
import AddCatPage from './pages/AddCatPage';

function App() {
  return (
    <div className="App">

    <Navbar/>

    <Routes>

    <Route path='/' element={ <HomePage />} />
    <Route path='/cats' element={ <CatsPage /> } />
    <Route path='/cats/add-a-cat' element={ <AddCatPage /> } />

    </Routes>
    </div>
  );
}

export default App;
