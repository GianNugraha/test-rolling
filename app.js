const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const multer = require('multer')
const bodyParser = require('body-parser')
// READ IMAGES //
app.use(express.static(__dirname + '/image'));


const router = require("./routes");
require("dotenv").config();
const cors = require("cors");

// app.use(express.static(__dirname + '/public/files'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});