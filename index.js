console.clear()

const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

// configration
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json())

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use('/api/history', require('./api/route'))


const PORT = process.env.PORT || 5656
app.listen(PORT, () => {
  console.log(`APP is Running on PORT ${PORT}`);
  const uri = `mongodb+srv://${process.env.MONGODBUSER}:${process.env.PASSWORD}@cluster0.krol4pa.mongodb.net/?retryWrites=true&w=majority`;
  mongoose.connect(uri, {
    userNewParser: true
  }, () => {
    console.log('Database Connected');

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1
    });

    const weather = client.db('open-weather').collection('history');

    app.post('/history', (req, res) => {
      const data = req.body;
      weather.insertOne(data);
      console.log(data);
    })
  })
});