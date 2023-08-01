import React, { createContext, useState, useContext } from 'react';

const SpeciesContext = createContext();

export function useSpecies() {
  return useContext(SpeciesContext);
}

export function SpeciesProvider({ children }) {
  const [species, setSpecies] = useState('');

  return (
    <SpeciesContext.Provider value={{ species, setSpecies }}>
      {children}
    </SpeciesContext.Provider>
  );
}
