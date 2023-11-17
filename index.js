const express = require('express');
const app = express();
const { peticionGet, peticionPost } = require('./utilities.js')
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Property And Characteristic
// Get all Property
app.get('/api/properties', async function(req, res) {
  let data =  await peticionGet('http://localhost:8082/airNUR/property/');
  res.json(data);
});

// Get Property by ID
app.get('/api/property/:idProperty', async function(req, res) {
  const idProperty = req.params.idProperty;
  let data =  await peticionGet(`http://localhost:8082/airNUR/property/${idProperty}`);
  let dataCharacteristic =  await peticionGet(`http://localhost:8082/airNUR/property/characteristic/${idProperty}`);
  data.characteristics = dataCharacteristic;
  res.json(data);
});

// Get all characteristics
app.get('/api/characteristics', async function(req, res) {
  let data =  await peticionGet('http://localhost:8082/airNUR/characteristic/');
  res.json(data);
});

// Get all Property BY userId
app.get('/api/property/users/:idUser', async function(req, res) {
  const idUser = req.params.idUser;
  let data =  await peticionGet(`http://localhost:8082/airNUR/property/users/${idUser}`);
  res.json(data);
});

// insert property
app.post('/api/property', async function(req, res) {
  let data =  await peticionPost(`http://localhost:8082/airNUR/property/`, req.body);
  res.json({id: data.id});
});

// insert characteristic
app.post('/api/characteristic', async function(req, res) {
  let data =  await peticionPost(`http://localhost:8082/airNUR/characteristic/`, req.body);
  res.json({id: data.id});
});

// insert Property Characteristic
app.post('/api/property/characteristic', async function(req, res) {
  let data =  await peticionPost(`http://localhost:8082/airNUR/property/characteristic`, req.body);
  res.json({id: data.id});
});

// Create Reserve
app.post('/api/reserve', async function(req, res) {

  let dataProperty =  await peticionGet(`http://localhost:8082/airNUR/property/${req.body.publishID}`);
  let data = null ;
  if(dataProperty.id) {
      let data =  await peticionPost(`http://localhost:9090/airNUR/reserve/`, req.body);
      res.json({id: data.id});
  }
  res.json({message: 'the property does not exist'});
});

// Get Reserve by ID
app.get('/api/reserve/:idReserve', async function(req, res) {
  const idReserve = req.params.idReserve;
  let data =  await peticionGet(`http://localhost:9090/airNUR/reserve/${idReserve}`);
  res.json(data);
});

// Get Reserve By userId
app.get('/api/reserve/users/:idUser', async function(req, res) {
  const idUser = req.params.idUser;
  let data =  await peticionGet(`http://localhost:9090/airNUR/publish/users/${idUser}`);
  res.json(data);
});

// Create CheckIn
app.post('/api/checkIn', async function(req, res) {
    let data =  await peticionPost(`http://localhost:9090/airNUR/checkIn/`, req.body);
    res.json(data);
});

// Get CheckIn by ID
app.get('/api/checkIn/:idCheckIn', async function(req, res) {
  const idCheckIn = req.params.idCheckIn;
  let data =  await peticionGet(`http://localhost:9090/airNUR/checkIn/${idCheckIn}`);
  res.json(data);
});

// Create CheckOut
app.post('/api/checkOut', async function(req, res) {
  let data =  await peticionPost(`http://localhost:9090/airNUR/checkOut/`, req.body);
  res.json(data);
});

// Get CheckOut by ID
app.get('/api/checkOut/:idCheckOut', async function(req, res) {
  const idCheckOut = req.params.idCheckOut;
  let data =  await peticionGet(`http://localhost:9090/airNUR/checkOut/${idCheckOut}`);
  res.json(data);
});

// Create Payment
app.post('/api/payment', async function(req, res) {
  let data =  await peticionPost(`http://localhost:9090/airNUR/payment/`, req.body);
  res.json(data);
});

// Get Payment by ID
app.get('/api/payment/:idPayment', async function(req, res) {
  const idPayment = req.params.idPayment;
  let data =  await peticionGet(`http://localhost:9090/airNUR/payment/${idPayment}`);
  res.json(data);
});




app.use('/', router);

app.listen(3000, () => {
    console.log("start application")
})
