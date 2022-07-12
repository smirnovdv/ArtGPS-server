const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const auth = process.env.DBPASSWORD;

app.use(cors());


//db connection
const {
  Client
} = require('pg');


const connectionObject = {
  host: "ec2-18-211-108-143.compute-1.amazonaws.com",
  database: "d6j40kiuskmjlo",
  port: 5432,
  user: "fmqizevnmknwse",
  password:  "4dd279585c4c04103bcddad60519621558658cab606d82b2d030b0ecf2bb7f55" 
};

const client = new Client(connectionObject);
client.connect()
  .then(function (returnedData) {
    console.log(`Connected to ${client.database} dB`);
  })
  .catch(function (err) {
    console.error('connection error', err.stack)
  });




//handling requests
app.get('/get_challenge', (req, res) => {
  const query = `SELECT * FROM artworks
                ORDER BY RANDOM() LIMIT 3
              `
  client.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }
    console.log(data.rows);
    res.send(data.rows);
  });
});

app.get('/get_inspiration', (req, res) => {
  const query = `SELECT * FROM modern_artists
                 WHERE id = ${req.query.id}
                `
  client.query(query, function (err, data) {
    console.log(err, data.rows);
    res.send(data.rows);
  });
});

app.get('/get_test', (req, res) => {
  console.log(client)
  const query = `SELECT * FROM modern_artists
               ORDER by random() 
               LIMIT 2;
              `
  client.query(query, function (err, data) {
    res.send(data.rows);
  });

});

app.get('/', (req, res) => {
  res.send('Welcome To The World Of Art!')
})

//server setup
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})