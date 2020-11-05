import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';


const Forecast = () => {
let [city, setCity] = useState('');
let [unit, setUnit] = useState('imperial');
let [clean, setClean] = useState(true);
// error handling
let [error, setError] = useState(false);
let [loading, setLoading] = useState(false);
    
    // converts input to string
const uriEncodedCity = encodeURIComponent(city);

    // destructing - when wrapped in an array
let [responseObj, setResponseObj] = useState({});

function resetForm(e) {
    e.preventDefault();
    setCity('');
    setUnit('imperial');
    setResponseObj({});
    setClean(true);
}

function getForecast(e) { // You can try to write arrow functions(const getForecast = () => {}), the are simple and more readable
    e.preventDefault();

    if (city.length === 0) { // just if (!city)
        return setError(true);
    }
    // Clear state in preparation for new data
    setError(false);
    setResponseObj({});
   
    setLoading(true);
   
    let uriEncodedCity = encodeURIComponent(city);
 fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`
        }
    })
    .then(response => response.json())
    .then(response => {
        if (response.cod !== 200) {
            throw new Error() // bad practice to throw an error here, it would be better if you can track response info and show it somewhere
        }                     // for example - some simlpe notification or instead of <Conditions/> component 
                              // than you'll don't have to describe an error in <Conditions/>
        setResponseObj(response); 
        setLoading(false);
        setClean(false);
    })
    .catch(err => {
        setError(true);
        setLoading(false);
      //  setClean(false);
        console.log(err.message);
    });
 }
   
   return (
    <div>
           <h2>Find Current Weather Conditions</h2>
           <form onSubmit={getForecast}>
            <input  
                    type="text" // you can use a simple browser validation here, just with a word `required` in input field, so 
                    placeholder="Enter City" // you will don't need to have an error property at all, just don't
                    maxLength="50" // forget to include you submit button into a <form> tag with 
                    className={classes.textInput}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                 <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>
                <button className={classes.Button} type="submit">Get Forecast</button>
                <button className={classes.ResetButton} 
                        id="reset"
                        hidden={clean}
                        onClick={resetForm}
                        type="button">Reset</button>
            </form> 
// the main mistake here is that you are loading <Conditions/> component in all cases, even if the response is empty or an arror occured
// to make a better performance - remove arror message to a saparete component, loader - to another, and only if the response is not empty -
// load your component here
// than you would have such logic: Object.keys(responseObj).length > 0 && <Conditions/> or responseObj.length > 0 && <Conditions/> in case it's an array
           <Conditions           
                responseObj={responseObj}
                error={error} //new
                loading={loading} 
               />
       </div>
   )
   
}


export default Forecast;
