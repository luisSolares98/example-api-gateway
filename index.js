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
  try {
    let data =  await peticionGet(`http://localhost:8082/airNUR/property/${idProperty}`);
  let dataCharacteristic =  await peticionGet(`http://localhost:8082/airNUR/property/characteristic/${idProperty}`);
  data.characteristics = dataCharacteristic;
  res.json(data);
  } catch (ex) {
    res.json({message: "Not found"}).status(400);
  }
  
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
  let dataUser =  await peticionGet(`http://localhost:6000/user/${req.body.userID}`);

  let data = null ;
  if(dataProperty.id && dataUser!=null) {
      let data =  await peticionPost(`http://localhost:9090/airNUR/reserve/`, req.body);
      res.json({id: data.id});
  }
  res.json({message: 'the date not exist'});
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

// Get Chat Host by ID
app.get('/api/chat/host/:hostIdParam', async function(req, res) {
  const hostIdParam = req.params.hostIdParam;
  let data =  await peticionGet(`http://localhost:4000/chat/host/${hostIdParam}`);
  res.json(data);
});

// Get Chat Guest by ID
app.get('/api/chat/guest/:guestIdParam', async function(req, res) {
  const guestIdParam = req.params.guestIdParam;
  let data =  await peticionGet(`http://localhost:4000/chat/guest/${guestIdParam}`);
  res.json(data);
});

// Get Chats All
app.get('/api/chats', async function(req, res) {
  let data =  await peticionGet(`http://localhost:4000/chats`);
  res.json(data);
});

// insert chat
app.post('/api/chat', async function(req, res) {
  let data =  await peticionPost(`http://localhost:4000/chat/create`, req.body);
  res.json(data);
});

// Get Message by ID
app.get('/api/message/:chatIdParam', async function(req, res) {
  const chatIdParam = req.params.chatIdParam;
  let data =  await peticionGet(`http://localhost:4000/message/${chatIdParam}`);
  res.json(data);
});

// insert message
app.post('/api/message', async function(req, res) {
  let data =  await peticionPost(`http://localhost:4000/chat/create`, req.body);
  res.json(data);
});

// Get User
app.get('/api/users', async function(req, res) {
  const uuid = req.params.uuid;
  let data =  await peticionGet(`http://localhost:6000/users`);
  res.json(data);
});

// Get User by ID
app.get('/api/user/:uuid', async function(req, res) {
  const uuid = req.params.uuid;
  let data =  await peticionGet(`http://localhost:6000/user/${uuid}`);
  res.json(data);
});

// insert user
app.post('/api/user', async function(req, res) {
  let data =  await peticionPost(`http://localhost:6000/user/`, req.body);
  res.json(data);
});

app.use('/', router);

app.listen(3000, () => {
    console.log("start application")
})
