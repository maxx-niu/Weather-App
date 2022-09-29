import React, {useState, useEffect} from "react";
import Modal from './Modal';
import Results from "./Results";
import Switch from "./Switch";

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
    const [isToggleFarenheit, setIsToggleFarenheit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(city && country){
            // on user input
            setIsModalOpen(false);
            const fetchURL = process.env.REACT_APP_BASE_URL + 'weather?q=' + city + ',' + country + '&units=metric' + '&appid=' + process.env.REACT_APP_API_KEY;
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
                    setIsModalOpen(true);
                    console.log(err);
                })
        } else {
            // if user didn't enter valid city/country, 
            setIsModalOpen(true);
        }
        setCity('');
        setCountry('');
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
                </div>
                {!hasResult && <div className="location-box"><div className="location">Want to know the forecast of somewhere?</div>
                <div className="location" style={{fontStyle: "italic"}}>Just type in the location above!</div></div>}
                <Modal open={isModalOpen} onClose={() => {setIsModalOpen(false)}}>
                    Please input a valid city and country!
                </Modal>
                <Results hasResult={hasResult} displayData={displayData} toggleFarenheit={isToggleFarenheit}></Results>
                {hasResult &&
                <Switch isToggled={isToggleFarenheit} onToggle={
                    () => {
                        setIsToggleFarenheit(!isToggleFarenheit);
                    }
                }></Switch>}
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