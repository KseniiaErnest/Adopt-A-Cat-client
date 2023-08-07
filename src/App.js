
import './App.css';
import { Routes, Route, } from 'react-router-dom';

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
import StickyNavBar from './components/StickyNavBar';


function App() {

  return (
    <div className="App">

{/* <Navbar/> */}
<StickyNavBar />

    <Routes>

    <Route path='/' element={<HomePage />} />
        <Route path='/cats' element={<IsPrivate allowedRoles={['Cat Owner', 'Adopter']}><CatsPage /></IsPrivate>} />
        <Route path='/cats/:catId' element={<IsPrivate allowedRoles={['Cat Owner', 'Adopter']}><CatDetailsPage /></IsPrivate>} />
        <Route path='/cats/add-a-cat' element={<IsPrivate allowedRoles={['Cat Owner']}><AddCatPage /></IsPrivate>} />
        <Route path='/cats/edit/:catId' element={<IsPrivate allowedRoles={['Cat Owner']}><EditCatPages /></IsPrivate>} />
        <Route path='/locations' element={<IsPrivate allowedRoles={['Cat Owner', 'Adopter']}><LocationsPage /></IsPrivate>} />
        <Route path='/locations/add-a-location' element={<IsPrivate allowedRoles={['Cat Owner']}><AddLocationPage /></IsPrivate>} />
        <Route path='/locations/:locationId' element={<IsPrivate allowedRoles={['Cat Owner', 'Adopter']}><LocationDetailsPage /></IsPrivate>} />
        <Route path='/locations/edit/:locationId' element={<IsPrivate allowedRoles={['Cat Owner']}><EditLocationPage /></IsPrivate>} />
        <Route path='/signup' element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />

    </Routes>

    </div>
  );
}

export default App;




