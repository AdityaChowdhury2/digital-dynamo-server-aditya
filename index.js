const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.xs6ettt.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const database = client.db('dynamoDB');
        const brandsCollection = database.collection('brands');
        const productsCollection = database.collection('products');
        const bannersCollection = database.collection('banners');

        app.get('/api/brands', async (req, res) => {
            const cursor = brandsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/api/brands/:brand', async (req, res) => {
            const brand = req.params.brand;
            const query = { brand: brand };
            const cursor = productsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/api/banners/:brand', async (req, res) => {

            const brand = req.params.brand;
            const filter = { name: brand };
            const options = { projection: { banner_images: 1 } }
            const result = await bannersCollection.findOne(filter, options)
            res.send(result);
        })

    } finally {


    }
}
run().catch(console.dir);

app.listen(port, (req, res) => {
    console.log("Listening on port " + port);
});