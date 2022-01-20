require('dotenv').config()
const cors = require('cors')
const adminRoutes = require('./routes/admin')
const employerroutes = require('./routes/user')
var express = require('express');
const connectdb = require("./connection.js");
var path = require("path");

var app = express();
app.use(cors());
connectdb()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/admin', adminRoutes);
app.use('/user', employerroutes);

app.use("/", express.static(path.join(__dirname, '..', 'dist', 'frontend')));
app.get('/*', (req, res) => {
  console.log(__dirname + '..' + 'dist');
  res.sendFile(path.join(__dirname, '..', 'dist', 'frontend', 'index.html'));
})

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})