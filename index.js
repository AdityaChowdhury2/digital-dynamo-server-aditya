const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.prw6fyz.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("Welcome to my Digital Dynamo Server!!!");
})

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
        const usersCollection = database.collection('users');

        //get brands name and images for homepage
        app.get('/api/brands', async (req, res) => {
            const cursor = brandsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        //get specific brands product
        app.get('/api/brands/:brand', async (req, res) => {
            const brand = req.params.brand;
            const query = { brand: brand };
            const cursor = productsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        //get specific brands banner
        app.get('/api/banners/:brand', async (req, res) => {
            const brand = req.params.brand;
            const filter = { name: brand };
            const options = { projection: { banner_images: 1 } }
            const result = await bannersCollection.findOne(filter, options)
            res.send(result);
        })

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


        //user collection apis 
        app.post('/api/user', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.get('/api/user/:userEmail', async (req, res) => {
            const email = req.params.userEmail;

            const filter = { email: email };
            const result = await usersCollection.findOne(filter)
            res.send(result);
        })

        //set cart data in user collection 
        app.patch('/api/user/:userEmail', async (req, res) => {
            const email = req.params.userEmail;
            const filter = { email: email };
            const newCart = req.body;
            const updatedUser = {
                $set: {
                    cart: newCart
                }
            }
            const result = await usersCollection.updateOne(filter, updatedUser);
            res.send(result);
        })
    } catch (e) {
        console.log(e);

    }
}
run()

app.listen(port, (req, res) => {
    console.log("Listening on port " + port);
});