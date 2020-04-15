//const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]
// const url = 'https://api.darksky.net/forecast/18981b1f9bc4d9e2838e9cf103bc29ba/37.8267,-122.4233?units=si&lang=fr'

// request({ url: url, json: true }, (error, response) =>{
//     if(error)
//         console.log('Unable to connect to weather service!')
//     else if(response.body.error)
//     {
//         console.log('Unable to find location')
//     }
//     else
//     {
//         console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees and there is ' + 
//         response.body.currently.precipProbability + ' % of rain')
//     }
    
// }) 

if(!address)
    console.log('Please provide an address')
else{
    geocode(address, (error, {latitude, longitude, location}) => {
        if(error)
           return console.log(error)
   
       forecast(latitude, longitude, (error, forecastData) => {
           if(error)
               return console.log(error)
           else
           console.log(location)
           console.log(forecastData)
         })
       
    })
}




