const express = require('express');
const routerApi = require('./routes');


const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

app.get('/', (req, res) => {
  res.send('testing app');
});

app.listen(port, () => {
  console.log("I'm running on port " + port);
});
