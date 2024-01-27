const express = require('express');
const app = express();
const { peticionGet, peticionPost } = require('./utilities.js')
const router = express.Router();

const cors = require('cors');
const corsOptions = {
  origin: '*', // Reemplaza con el origen de tu aplicación Angular
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Habilita el envío de cookies
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const URL_PROPERTY = 'http://165.227.192.71:8080/airNUR'
const URL_RESERVE = 'http://161.35.232.16:9090/airNUR'
const URL_CHAT_MESSAGE = 'http://147.182.253.73:4000'


// Property And Characteristic
// Get all Property
app.get('/api/properties', async function(req, res) {
  let data =  await peticionGet(`${URL_PROPERTY}/property/`);
  res.json(data);
});

// Get Property by ID
app.get('/api/property/:idProperty', async function(req, res) {
  const idProperty = req.params.idProperty;
  try {
    let data =  await peticionGet(`${URL_PROPERTY}/property/${idProperty}`);
    let dataCharacteristic =  await peticionGet(`${URL_PROPERTY}/property/characteristic/${idProperty}`);
    data.characteristics = dataCharacteristic;
    res.json(data);
  } catch (ex) {
    res.json({message: "Not found"}).status(400);
  }
  
});

// Get all characteristics
app.get('/api/characteristics', async function(req, res) {
  let data =  await peticionGet(`${URL_PROPERTY}/characteristic/`);
  res.json(data);
});

// Get all Property BY userId
app.get('/api/property/users/:idUser', async function(req, res) {
  const idUser = req.params.idUser;
  let data =  await peticionGet(`${URL_PROPERTY}/property/users/${idUser}`);
  res.json(data);
});

// insert property
app.post('/api/property', async function(req, res) {

    let data =  await peticionPost(`${URL_PROPERTY}/property/`, req.body);
    res.json(data);

});

// delete property
app.get('/api/property/delete/:idProperty', async function(req, res) {

  const idProperty = req.params.idProperty;
  let data =  await peticionGet(`${URL_PROPERTY}/property/delete/${idProperty}`);
  res.json({id: data});

});

// insert characteristic
app.post('/api/characteristic', async function(req, res) {
  let data =  await peticionPost(`${URL_PROPERTY}/characteristic/`, req.body);
  res.json({id: data.id});
});

// insert Property Characteristic
app.post('/api/property/characteristic', async function(req, res) {
  let data =  await peticionPost(`${URL_PROPERTY}/property/characteristic`, req.body);
  res.json({id: data.id});
});

// Create Reserve
app.post('/api/reserve', async function(req, res) {

  let dataProperty =  await peticionGet(`${URL_PROPERTY}/property/${req.body.publishID}`);

  let data = null;
  if(dataProperty != null ) {
      let data =  await peticionPost(`${URL_RESERVE}/reserve/`, req.body);
      res.json(data);
  } else {
    res.json({message: 'the data not exist'});
  }
});

// Get Reserve by ID
app.get('/api/reserve/:idReserve', async function(req, res) {
  const idReserve = req.params.idReserve;
  let data =  await peticionGet(`${URL_RESERVE}/reserve/${idReserve}`);
  res.json(data);
});

// Get Reserve By userId
app.get('/api/reserve/users/:idUser', async function(req, res) {
  const idUser = req.params.idUser;
  let data =  await peticionGet(`${URL_RESERVE}/publish/users/${idUser}`);

  if(data && data.length > 0 ) {
    let properties = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let property =  await peticionGet(`${URL_PROPERTY}/property/${element.publicationID}`);
      properties.push(property);
    }

    res.json(properties);
  } else {
    res.json(null);
  }

});

// Create CheckIn
app.post('/api/checkIn', async function(req, res) {
    let data =  await peticionPost(`${URL_RESERVE}/checkIn/`, req.body);
    res.json(data);
});

// Get CheckIn by ID
app.get('/api/checkIn/:idCheckIn', async function(req, res) {
  const idCheckIn = req.params.idCheckIn;
  let data =  await peticionGet(`${URL_RESERVE}/checkIn/${idCheckIn}`);
  res.json(data);
});

// Create CheckOut
app.post('/api/checkOut', async function(req, res) {
  let data =  await peticionPost(`${URL_RESERVE}/checkOut/`, req.body);
  res.json(data);
});

// Get CheckOut by ID
app.get('/api/checkOut/:idCheckOut', async function(req, res) {
  const idCheckOut = req.params.idCheckOut;
  let data =  await peticionGet(`${URL_RESERVE}/checkOut/${idCheckOut}`);
  res.json(data);
});

// Create Payment
app.post('/api/payment', async function(req, res) {
  let data =  await peticionPost(`${URL_RESERVE}/payment/`, req.body);
  res.json(data);
});

// Get Payment by ID
app.get('/api/payment/:idPayment', async function(req, res) {
  const idPayment = req.params.idPayment;
  let data =  await peticionGet(`${URL_RESERVE}/payment/${idPayment}`);
  res.json(data);
});

// Get Chat Host by ID
app.get('/api/chat/host/:hostIdParam', async function(req, res) {
  const hostIdParam = req.params.hostIdParam;
  let data =  await peticionGet(`${URL_CHAT_MESSAGE}/chat/host/${hostIdParam}`);
  res.json(data);
});

// Get Chat Guest by ID
app.get('/api/chat/guest/:guestIdParam', async function(req, res) {
  const guestIdParam = req.params.guestIdParam;
  let data =  await peticionGet(`${URL_CHAT_MESSAGE}/chat/guest/${guestIdParam}`);
  res.json(data);
});

// Get Chats All
app.get('/api/chats', async function(req, res) {
  let data =  await peticionGet(`${URL_CHAT_MESSAGE}/chats`);
  res.json(data);
});

// insert chat
app.post('/api/chat', async function(req, res) {
  let data =  await peticionPost(`${URL_CHAT_MESSAGE}/chat/create`, req.body);
  res.json(data);
});

// Get Message by ID
app.get('/api/message/:chatIdParam', async function(req, res) {
  const chatIdParam = req.params.chatIdParam;
  let data =  await peticionGet(`${URL_CHAT_MESSAGE}/message/${chatIdParam}`);
  res.json(data);
});

// insert message
app.post('/api/message', async function(req, res) {
  let data =  await peticionPost(`${URL_CHAT_MESSAGE}/chat/create`, req.body);
  res.json(data);
});

app.use('/', router);

app.listen(3000, () => {
    console.log("start application")
})
