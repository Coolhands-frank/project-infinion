"use client"; // Make sure this is a client-side component

import React, { createContext, useState } from 'react';

// Create a Context
export const StateContext = createContext();

// Create a Provider component
export function StateProvider({ children }) {
  const [selectedCampaign, setSelectedCampaign] = useState(null); // The shared state

  return (
    <StateContext.Provider value={{ selectedCampaign, setSelectedCampaign }}>
      {children}
    </StateContext.Provider>
  );
}