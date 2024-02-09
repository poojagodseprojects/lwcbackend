const express = require('express');
//const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const multer=require('multer');
const getfields=multer();

const app = express();
const port = 4000;

//app.use(bodyParser.json());
app.use(express.json());

const uri = 'mongodb+srv://pooja:tele123@cluster0.eti8kdu.mongodb.net/employeedb?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/",async (req, res) => {
    try {        
        res.status(200).send('Reached root');
    } catch (error) {
        console.error('Error reaching root:', error);
        res.status(500).send('An error occurred while reaching root.');
    } 
});
app.post('/insertDataToMongoDB', getfields.none(),async (req, res) => {
    try {
        console.log(req.body);
        await client.connect();
        const database = client.db('employeedb');
        const collection = database.collection('employees');

        const { fname, id } = req.body;
        const result = await collection.insertOne({ fname, id });
        res.status(200).send('Data inserted successfully into MongoDB Atlas.');
    } catch (error) {
        console.error('Error inserting data into MongoDB Atlas:', error);
        res.status(500).send('An error occurred while inserting data into MongoDB Atlas.');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
