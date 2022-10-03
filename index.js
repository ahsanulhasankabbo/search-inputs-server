const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ddlz6w5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const informationCollection = client.db('search_inputs').collection('names');

        app.get("/infomations", async(req,res) => {
            const query = {};
            const custer = informationCollection.find(query);
            const informations = await custer.toArray();
            res.send(informations);
        })
    }
    finally{

    }

}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World! from searchbox')
})

app.listen(port, () => {
  console.log(`searchbox Example app listening on port ${port}`)
})