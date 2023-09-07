const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
require('dotenv').config()
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')
const data = require('./data');
const { Collection } = require('mongoose');

let totalRecovered = 0;
let totalInfected = 0;
let totalDeath = 0;
data.data.map(i =>
  totalRecovered += i.recovered
  
)
data.data.map(i =>
  totalInfected = totalInfected + i.infected
)
data.data.map(i =>
  totalDeath = totalDeath + i.death
)
app.get("/totalRecovered", (req, res) => {
  try {
    res.status(200).json({
      data: { _id: "total", recovered: totalRecovered }
    })
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }


})
app.get('/totalActive', (req, res) => {
  const Active_cases = (totalInfected - totalRecovered)
  try {
    res.status(200).json({
      data: { data: { _id: "total", active: Active_cases } }
    })
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }


})

app.get('/totalDeath', (req, res) => {
  try {
    res.status(200).json({
      data: { data: { _id: "total", death: totalDeath } }
    })
  } catch (error) {
    res.status(500).json({
      error: err
    })
  }


})

app.get('/hotspotStates', (req, res) => {

  try {
    const states = [];
    data.data.map((i) => {
      rateValue = ((i.infected - i.recovered) / i.infected).toFixed(5)

      if (rateValue > 0.1) {
         states.push({ "state": i.state, "rate": rateValue }) }
    }
    )
    res.status(200).json(
      { data: states }
    )
   
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }
})

app.get("/healthyStates",(req,res)=>{
  try {
    const result = []
data.data.map((i) => {
  mortality = ((i.death )/ i.infected).toFixed(5)

  if (mortality < 0.005) {
     result.push({ "state": i.state, "mortality": mortality }) }
}
)
res.status(200).json(
  { data: result }
)

  } catch (err) {
    res.status(500).json({
      error: err
    })
  }
  

})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;