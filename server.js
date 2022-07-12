const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(cors());


//db connection
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  }
});

client.connect(err => {
  console.log('hi from client connect')
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})



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
  const query = `SELECT * FROM modern_artists
               ORDER by random() 
               LIMIT 2;
              `
  client.query(query, function (err, data) {
    if (err){
      throw err
    }
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