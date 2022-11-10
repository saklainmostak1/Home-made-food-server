const express = require('express');
const app = express()
// const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ckrddue.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const foodCollection = client.db('homeFood').collection('services')

        const reviewCollection = client.db('homeFood').collection('reviews')

        app.get('/foods', async (req, res) => {
            const query = {}
            const cursor = foodCollection.find(query)
            const foods = await cursor.limit(3).toArray()
            res.send(foods)
        })
        app.get('/allFoods', async (req, res) => {
            const query = {}
            const cursor = foodCollection.find(query)
            const foods = await cursor.toArray()
            res.send(foods)
        })
        app.get('/foods/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const food = await foodCollection.findOne(query)
            res.send(food)
        })

        app.get('/allReviews',  async (req, res) => {
            // console.log(req.headers.authorization);
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email,
                }
            }
            const cursor = reviewCollection.find(query)
            const review = await cursor.toArray()
            res.send(review)
        })
        app.get('/allReviews/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const review = await reviewCollection.findOne(query)
            res.send(review)
        })
        app.get('/foodReviews', async (req, res) => {
            console.log(req.query);
            let query = {}
            if (req.query.service) {
                query = {
                    service: req.query.service
                }
            }
            const cursor = reviewCollection.find(query)
            const review = await cursor.toArray()
            res.send(review)
        })


        app.post('/foodAdd', async (req, res) => {
            const add = req.body
            const result = await foodCollection.insertOne(add)
            console.log(result);
            res.send(result)
        })

        app.post('/reviews', async (req, res) => {
            const reviews = req.body
            const result = await reviewCollection.insertOne(reviews)
            res.send(result)
        })
        app.put('/allReviews/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const review = req.body
            const option = { upsert: true }
            const updateReview = {
                $set: {
                    name: review.name,
                    text: review.text
                }
            }
            const result = await reviewCollection.updateOne(filter, updateReview, option)
            res.send(result)

        })

        app.delete('/allReviews/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await reviewCollection.deleteOne(query)
            res.send(result)
        })



    }
    finally {

    }
}
run().catch(error => console.error(error))




app.use('/', (req, res) => {
    res.send('Food review ')
})


app.listen(port, (req, res) => {
    console.log('Api is running on', port);
})