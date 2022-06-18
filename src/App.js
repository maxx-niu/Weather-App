import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

// API documentation: https://openweathermap.org/current
const defaultConfig = {
    city: "Waterloo",

}

const App = () => {

    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("form submitted!");
        setCity('');
    }

    return <>
        <h1>Hello</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="city">Search Weather by City: </label>
            <input type="text" id="city" name="city" value={city}
            placeholder="Waterloo"
            onChange={(e) => {setCity(e.target.value)}} />
        </form>
        {/* <h2>{process.env.REACT_APP_API_KEY}</h2> */}
    </>
}

export default App