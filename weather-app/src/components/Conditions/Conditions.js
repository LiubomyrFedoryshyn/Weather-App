import React from 'react';
import classes from './Conditions.module.css'
const conditions = (props) => { // bad naming here, use 'data' or some another word
// you can use destructuring here 
// const conditions = ({ responseObj }) => { 
// it will allow you to manipulate your object manualy, like 'responseObj.cod', not 'props.responseObj.cod' 
   return (
       <div className={classes.Wrapper}>
      // you can track an error in object which you receive, and show it to a user
           {props.error && <small className={classes.Small}>Please enter a valid city.</small>} 
      // separate component
           {props.loading && <div className={classes.Loader} ></div>}  
// it would be better if you had moved responseObj properties to some state with useState hook;
           {props.responseObj.cod === 200 ?// bad practise, would be better if you will check the object length
               <div>
                   <p>City: <strong>{props.responseObj.name}</strong></p>
                   <p>Temperature: <strong>{Math.round(props.responseObj.main.temp)} degrees</strong> </p>
                   <p>Weather conditions: <strong>{props.responseObj.weather[0].description}</strong></p>
                   <p>Humidity: <strong>{props.responseObj.main.humidity}</strong></p>
                   <p>Pressure: <strong>{props.responseObj.main.pressure} hPa </strong></p>
                   <p>Wind speed: <strong>{props.responseObj.wind.speed} m/s </strong></p>
               </div>
           : null
           }
       </div>
   )
}
export default conditions;
