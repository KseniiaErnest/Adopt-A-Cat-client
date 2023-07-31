
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

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
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import LandingPage from './pages/LandingPage';


function App() {
  const location = useLocation();

  return (
    <div className="App">

{/* Conditionaly render the Navbar */}
    {location.pathname !== '/' && <Navbar/>}


    <Routes>

    <Route path='/' element={ <LandingPage /> }  />

    <Route path='/home/:species' element={<HomePage />} />
        <Route path='/pets/:species' element={<IsPrivate allowedRoles={['Cat Owner', 'Adopter']}><CatsPage /></IsPrivate>} />
        <Route path='/pets/:petId/:species' element={<IsPrivate allowedRoles={['Cat Owner', 'Adopter']}><CatDetailsPage /></IsPrivate>} />
        <Route path='/pets/add-a-cat/:species' element={<IsPrivate allowedRoles={['Cat Owner']}><AddCatPage /></IsPrivate>} />
        <Route path='/pets/edit/:petId/:species' element={<IsPrivate allowedRoles={['Cat Owner']}><EditCatPages /></IsPrivate>} />
        <Route path='/locations/:species' element={<IsPrivate allowedRoles={['Cat Owner', 'Adopter']}><LocationsPage /></IsPrivate>} />
        <Route path='/locations/add-a-location/:species' element={<IsPrivate allowedRoles={['Cat Owner']}><AddLocationPage /></IsPrivate>} />
        <Route path='/locations/:locationId/:species' element={<IsPrivate allowedRoles={['Cat Owner', 'Adopter']}><LocationDetailsPage /></IsPrivate>} />
        <Route path='/locations/edit/:locationId/:species' element={<IsPrivate allowedRoles={['Cat Owner']}><EditLocationPage /></IsPrivate>} />
        <Route path='/signup' element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />

    </Routes>
    </div>
  );
}

export default App;
