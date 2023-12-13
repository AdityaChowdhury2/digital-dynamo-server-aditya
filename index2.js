const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.wchpfeq.mongodb.net/?retryWrites=true&w=majority`;

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

    } finally {

    }
}
run().catch(console.dir);
// database apis
const database = client.db('dynamoDB');
const brandsCollection = database.collection('brands');
const productsCollection = database.collection('products');
const bannersCollection = database.collection('banners');
const usersCollection = database.collection('users');

//get brands name and images for homepage
// app.get('/api/brands', async (req, res) => {
//     try {
//         console.log("api/brands hitted");
//         const cursor = brandsCollection.find();
//         const result = await cursor.toArray();
//         if (!result) {
//             res.status(404).send('data not found');
//         }
//         else {
//             res.send(result);
//         }
//     } catch (error) {
//         res.status(404).send('data not found')
//     }
// })
//get specific brands product
// app.get('/api/brands/:brand', async (req, res) => {
//     const brand = req.params.brand;
//     const query = { brand: brand };
//     const cursor = productsCollection.find(query);
//     const result = await cursor.toArray();
//     res.send(result);
// })

//get specific brands banner
// app.get('/api/banners/:brand', async (req, res) => {
//     const brand = req.params.brand;
//     const filter = { name: brand };
//     const options = { projection: { banner_images: 1 } }
//     const result = await bannersCollection.findOne(filter, options)
//     res.send(result);
// })

//add products in database
app.post('/api/products', async (req, res) => {
    const newProduct = req.body;
    const result = await productsCollection.insertOne(newProduct);
    res.send(result);
})
app.get('/api/product/:productId', async (req, res) => {
    const id = req.params.productId;
    const filter = { _id: new ObjectId(id) }
    const result = await productsCollection.findOne(filter);
    res.send(result);
})

app.put('/api/product/:productId', async (req, res) => {
    const id = req.params.productId;
    const filter = { _id: new ObjectId(id) }
    const updatedProduct = req.body;
    const newProduct = {
        $set: {
            ...updatedProduct
        }
    }
    const result = await productsCollection.updateOne(filter, newProduct)
    res.send(result);
})
app.delete('/api/product/:productId', async (req, res) => {
    const id = req.params.productId;
    const filter = { _id: new ObjectId(id) }
    const result = await productsCollection.deleteOne(filter);
    res.send(result);
})




app.get('/api/user/:uid', async (req, res) => {
    console.log('api user');
    const uid = req.params.uid;
    const filter = { uid: uid };
    const result = await usersCollection.findOne(filter)
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send('data not found');
    }
})
//user collection api 
app.put('/api/user/:email', async (req, res) => {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res.send(result);
})
//set cart data in user collection 
app.patch('/api/user/:uid', async (req, res) => {
    const uid = req.params.uid;
    const filter = { uid: uid };
    const newCart = req.body;
    const updatedUser = {
        $set: {
            cart: newCart
        }
    }
    const result = await usersCollection.updateOne(filter, updatedUser);
    res.send(result);
})
app.get('/', (req, res) => {
    res.send("Welcome to my Digital Dynamo Server!!!");
})


app.listen(port, (req, res) => {
    console.log("Listening on port " + port);
});