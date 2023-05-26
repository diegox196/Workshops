const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
//middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: "*"
}));

//routes
app.get('/paises', function (req, res) {

  const countries = [
    { name: "Argentina", currency: "ars" },
    { name: "Australia", currency: "aud" },
    { name: "Brasil", currency: "brl" },
    { name: "Canadá", currency: "cad" },
    { name: "China", currency: "cny" },
    { name: "Colombia", currency: "cop" },
    { name: "Costa Rica", currency: "crc" },
    { name: "Egipto", currency: "egp" },
    { name: "Estados Unidos", currency: "usd" },
    { name: "Francia", currency: "eur" },
    { name: "India", currency: "inr" },
    { name: "Japón", currency: "jpy" },
    { name: "México", currency: "mxn" },
    { name: "Perú", currency: "pen" },
    { name: "Reino Unido", currency: "gbp" },
    { name: "Rusia", currency: "rub" },
    { name: "Sudáfrica", currency: "zar" },
    { name: "Suiza", currency: "chf" },
    { name: "Turquía", currency: "try" },
    { name: "Uruguay", currency: "uyu" },
  ];

  res.json(countries);

});
//start the app
app.listen(3001, () => console.log(`BBCR Exchange type service listening on port 3001!`))
