import React, { useState, useContext } from "react";
import { NetworkContext } from "../context/NetworkContext";

const RequestFilter = () => {
  const [filter, setFilter] = useState("");
  const { requests } = useContext(NetworkContext);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredRequests = requests.filter((request) =>
    request.type.includes(filter)
  );

  return (
    <div className="request-filter">
      <input
        type="text"
        placeholder="Filter by type"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredRequests.map((request, index) => (
          <li key={index}>{request.type}</li>
        ))}
      </ul>
    </div>
  );
};

export default RequestFilter;
