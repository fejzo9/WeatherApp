const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

//mongoose.set('useCreateIndex', true);

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/weatherDB', { useNewUrlParser: true, useUnifiedTopology: true });

/*
const weatherDataSchema = new mongoose.Schema({
    city: String,
    country: String,
    searchQuery: String,
    temperature: Number,
    timestamp: { type: Date, default: Date.now }
  });

  const WeatherData = mongoose.model('WeatherData', weatherDataSchema);

  const newWeatherData = new WeatherData({
    city: 'Sarajevo',
    country: 'Bosna i Hercegovina',
    searchQuery: '512mi1r2mirf12idim12t1t12fvqch',
    temperature: 25
  });

  newWeatherData.save()
  .then(result => {
    console.log('Podaci spremljeni u bazu:', result);
  })
  .catch(error => {
    console.error('Greška prilikom spremanja podataka:', error);
  });
*/


//Defining model for data
const WeatherData = mongoose.model('WeatherData', {
    city: String,
    country: String,
    searchQuery: String,
    temperature: Number,
    timestamp: {type:Date, default: Date.now}
});

/*
* Middleware for analyzing JSON data
* Middleware - function that are executed during the processing of HTTP requests or responses, 
* adding functionality to an Express application.
* When used, this middleware function parses the JSON data sent by the client via HTTP requests 
* (eg POST or PUT requests) and converts them into JavaScript objects that you can use in your code.
*/
app.use(express.json());

// Endpoint for storing data into database
app.post('/weather', async(req,res)=>{
    try{
        const { city, country, searchQuery, temperature } = req.body;
        const weatherData = new WeatherData({ city, country, searchQuery, temperature});
        await weatherData.save();
        res.status(201).json({message: 'Data successfully saved in the database!'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'An error occurred! Please check the data one more time.'})
    }

});

//Starting a server
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});