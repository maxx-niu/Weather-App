import React, {useState, useEffect} from "react";
import Modal from './Modal';
import Results from "./Results";
import { useGeoLocation } from "./useGeoLocation";

// API documentation: https://openweathermap.org/current
const defaultConfig = {
    city: "Waterloo",
    country: "Canada"
}

const App = () => {

    const [isModalOpen, setIsModalOpen] = useState(false); // for modal
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [hasResult, setHasResult] = useState(false);
    const [displayData, setDisplayData] = useState({});



    const handleSubmit = (e) => {
        e.preventDefault();
        if(city && country){
            // on user input
            setIsModalOpen(false);
            const fetchURL = process.env.REACT_APP_BASE_URL + 'weather?q=' + city + ',' + country + '&appid=' + process.env.REACT_APP_API_KEY;
            console.log(fetchURL);
            fetch(fetchURL)
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error('something went wrong, status: ' + res.status);
                })
                .then(data => { // on successful data fetch
                    console.log(data);
                    setDisplayData(data);
                    setHasResult(true);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            // if user didn't enter valid city/country, 
            setIsModalOpen(true);
        }
        setCity('');
        setCountry('');
    }

    const handleCurrentLocation = () => {

    }

    const dateBuilder = (d) => {
        const months = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday"];

        const day = days[d.getDay()];
        const date = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        return `${day} ${month} ${date}, ${year}`;
    }

    return (
        <div className="app">
            <main>
                <div className="search-box">
                <form onSubmit={handleSubmit}>
                    <div className="search-bars">
                        <input type="text" id="city" name="city" value={city}
                        placeholder="Enter a city"
                        onChange={(e) => {setCity(e.target.value)}} className="search-bar"/>
                    </div>
                    <div className="search-bars">
                        <input type="text" id="country" name="country" value={country}
                        placeholder="Enter a country"
                        onChange={(e) => {setCountry(e.target.value)}} className="search-bar"/>
                    </div>
                    <button type='submit' className="submit">Submit</button>
                </form>
                <h3>Or...</h3>
                <form onSubmit={handleCurrentLocation}>
                    <button type='submit'>Get Current Location Weather Data</button>
                </form>
                </div>
                <div className="location-box">
                    <div className="location">Location Data Goes Here</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">15</div>
                    <div className="weather">Sunny</div>
                </div>
                <Modal open={isModalOpen} onClose={() => {setIsModalOpen(false)}}>
                    Please input a valid city and country!
                </Modal>
                <Results hasResult={hasResult} displayData={displayData}>hi there</Results>
            </main>
        </div>
    )
}

export default App

/*
    1. get user geolocation
    2. make api call to weather app using geolocation
    3. display it
*/