import React from 'react';
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Home from './components/Home';
import LocationDetail from './components/LocationDetail';

const App = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="weather/:location" element={<LocationDetail city={location.state} />} />
      <Route
        path="*"
        element={(
          <main style={{ padding: '1rem' }}>
            <p>There&apos;s nothing here!</p>
          </main>
        )}
      />
    </Routes>
  );
};

export default App;
