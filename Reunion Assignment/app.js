const express = require('express');
const app = express();
const router = require('./api');

app.use(express.json());

// Use the router
app.use('/api', router);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
