const express = require('express');
const app = express();
const { middleware, obtainServices } = require('./utility.js')
const router = express.Router();
const { services } =  obtainServices();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Generico
services.forEach(({ nameRoute, url }) => {
    router.use(`/${nameRoute}`, function(req, res, next) {
        middleware(req, next, `${url}`)
      }, function (req, res) {
        res.json(req.data)
      });
});


app.use('/', router);

app.listen(3000, () => {
    console.log("start application")
})
