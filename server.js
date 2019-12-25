const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3001;

app.use(cors());

//db connection
const { Client } = require('pg');
const connectionObject = {
  host : "ec2-107-20-239-47.compute-1.amazonaws.com",
  database : "dcqcqfuvh1n779",
  ssl: "any", 
  port : 5432,
  user : "cxngcbwrxsmpac",
  password : "80c6f4106a03155d0ef38f3d31039e40590ab4ec34fc6ceba9d7354f473a94e4"
};

const client = new Client(connectionObject);
client.connect()
.then( function(returnedData) {
  console.log(`Connected to ${client.database} dB`);
})
.catch( function(err) {
  console.error('connection error', err.stack)
});

//handling requests
app.get('/get_challenge',(req,res)=>{
  const query = `SELECT * FROM artworks
                ORDER BY RANDOM() LIMIT 3
              ` 
  client.query(query, function(err, data) {
    console.log(err,data.rows);
    res.send(data.rows);
  });
});

app.get('/get_inspiration',(req,res)=>{
  const query = `SELECT * FROM modern_artists
                 WHERE id = ${req.query.id}
                ` 
  client.query(query, function(err, data) {
    console.log(err,data.rows);
    res.send(data.rows);
  });
});

app.get('/get_test',(req,res)=>{
  const query = `SELECT * FROM modern_artists
               ORDER by random() 
               LIMIT 2;
              ` 
  client.query(query, function(err, data) {
    res.send(data.rows);
  });

});

//server setup
app.listen(port, ()=>{
    console.log("Server is running on port 3001")
})












