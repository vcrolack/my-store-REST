const express = require('express');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  emailError,
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// const whitelist = ['http://localhost:8080', 'https://myapp.com'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Permision denied'))
//     }
//   }
// }

routerApi(app);

app.use(logErrors);
app.use(emailError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('testing app');
});

app.get('/nueva-ruta', checkApiKey,(req, res) => {
  res.send('Hola perú');
});

app.listen(port, () => {
  console.log("I'm running on port " + port);
});
