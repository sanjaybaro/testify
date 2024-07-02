import React, { useContext, useState } from "react";
import { NetworkContext } from "../context/NetworkContext";
import {
  Container,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import RequestDetails from "./RequestDetails";

const filterTypes = [
  "all",
  "fetch",
  "xhr",
  "doc",
  "css",
  "js",
  "font",
  "img",
  "media",
];

const NetworkPanel = () => {
  const { requests } = useContext(NetworkContext);
  const [filterType, setFilterType] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
  };

  const filteredRequests = requests.filter((request) => {
    if (filterType === "all") return true;
    return request.type === filterType;
  });

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          select
          label="Filter by Type"
          value={filterType}
          onChange={handleFilterChange}
          variant="outlined"
        >
          {filterTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Timing</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request, index) => (
              <TableRow
                key={index}
                onClick={() => handleRequestClick(request)}
                hover
              >
                <TableCell>{request.url}</TableCell>
                <TableCell>{request.method}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>{request.timing}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRequest && <RequestDetails request={selectedRequest} />}
    </Container>
  );
};

export default NetworkPanel;
