import React from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const renderObject = (obj) => {
  return (
    <div>
      {Object.entries(obj).map(([key, value]) => (
        <Typography key={key} variant="body1" gutterBottom>
          {`${key}: ${JSON.stringify(value)}`}
        </Typography>
      ))}
    </div>
  );
};

const RequestDetails = ({ request }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ mt: 2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="request details tabs"
      >
        <Tab label="Headers" />
        <Tab label="Preview" />
        <Tab label="Response" />
        <Tab label="Initiator" />
        <Tab label="Timing" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <pre>{JSON.stringify(request.headers, null, 2)}</pre>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <pre>{JSON.stringify(request.response, null, 2)}</pre>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {typeof request.response === "object" ? (
          renderObject(request.response)
        ) : (
          <pre>{request.response}</pre>
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <pre>{request.initiator}</pre>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <pre>{request.timing}</pre>
      </TabPanel>
    </Paper>
  );
};

export default RequestDetails;
