
//const mongodb = require('mongodb');

const mongoURI = process.env.URL+ "/covidtally"
// const mongoURI = "mongodb+srv://mittunani1999:7gjAquV24KksKurk@cluster0.rdsfc2c.mongodb.net/?retryWrites=true&w=majority"
let mongoose = require('mongoose');
const { tallySchema } = require('./schema')


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
collection_connection = mongoose.model('covidtally', tallySchema)


exports.connection = collection_connection;
