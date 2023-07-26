
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CatsPage from './pages/CatsPage';
import AddCatPage from './pages/AddCatPage';
import CatDetailsPage from './pages/CatDetailsPage';
import LocationDetailsPage from './pages/LocationDetailsPage';
import EditCatPages from './pages/EditCatPages';
import LocationsPage from './pages/LocationsPage';
import AddLocationPage from './pages/AddLocationPage';
import EditLocationPage from './pages/EditLocationPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">

    <Navbar/>

    <Routes>

    <Route path='/' element={ <HomePage />} />
    <Route path='/cats' element={ <CatsPage /> } />
    <Route path='/cats/:catId' element={ <CatDetailsPage /> } />
    <Route path='/cats/add-a-cat' element={ <AddCatPage /> } />
    <Route path='/cats/edit/:catId' element={ <EditCatPages /> } />
    <Route path='/locations' element={ <LocationsPage /> } />
    <Route path='/locations/add-a-location' element={ <AddLocationPage /> } />
    <Route path='/locations/:locationId' element={ <LocationDetailsPage /> } />
    <Route path='/locations/edit/:locationId' element={ <EditLocationPage /> } />
    <Route path='/signup' element={ <SignupPage /> } />
    <Route path='/login' element={ <LoginPage /> } />

    </Routes>
    </div>
  );
}

export default App;
