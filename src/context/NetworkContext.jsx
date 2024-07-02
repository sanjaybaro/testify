
import React, { createContext, useState } from "react";

export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  const addRequest = (request) => {
    setRequests((prevRequests) => [...prevRequests, request]);
  };

  return (
    <NetworkContext.Provider value={{ requests, addRequest }}>
      {children}
    </NetworkContext.Provider>
  );
};
