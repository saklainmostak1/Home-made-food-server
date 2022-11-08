const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//  foodUser1 H73TZzKnwmOlOlwH



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ckrddue.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});




app.use('/', (req, res) =>{
    res.send('Food review ')
})


app.listen(port, (req, res) =>{
    console.log('Api is running on', port);
})