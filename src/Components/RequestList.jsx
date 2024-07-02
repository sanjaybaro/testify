import React, { useContext } from "react";
import { NetworkContext } from "../context/NetworkContext";

const RequestList = () => {
  const { requests } = useContext(NetworkContext);

  console.log("Current requests:", requests); // Add logging here

  return (
    <div className="request-list">
      <ul>
        {requests.map((request, index) => (
          <li key={index}>{request.url}</li>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;
