import React, {useState, useEffect, useRef} from "react";
import Modal from './Modal';
import Results from "./Results";

// API documentation: https://openweathermap.org/current

const App = () => {

    const [isModalOpen, setIsModalOpen] = useState(false); // for modal
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [hasResult, setHasResult] = useState(false);
    const [displayData, setDisplayData] = useState({});
    const [weatherCond, setWeatherCond] = useState('');
    const cityContainer = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(city && country){
            // on user input
            setIsModalOpen(false);
            const fetchURL = process.env.REACT_APP_BASE_URL + 'weather?q=' + city + ',' + country + '&units=metric' + '&appid=' + process.env.REACT_APP_API_KEY;
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
                    setHasResult(false);
                    setWeatherCond('');
                    console.log(err);
                })
        } else {
            // if user didn't enter valid city/country, 
            setIsModalOpen(true);
            setHasResult(false);
        }
        setCity('');
        setCountry('');
    }

    useEffect(() => {
        cityContainer.current.focus();
        if(Object.keys(displayData).length !== 0){
            const weatherID = displayData.weather[0].id;
            if(weatherID >= 200 && weatherID < 300){
                setWeatherCond('lightning');
            }
            else if(weatherID >= 300 && weatherID < 600){
                setWeatherCond('rainy');
            }
            else if(weatherID >= 600 && weatherID < 700){
                //TODO: change to snowy
                setWeatherCond('sunny');
            }
            else if(weatherID >= 700 && weatherID < 800){
                setWeatherCond('mist');
            }
            else if(weatherID === 800){
                setWeatherCond('sunny');
            }
            else {
                setWeatherCond('cloudy');
            }
        }
    }
    , [displayData]);

    return (
        <div className={"app " + weatherCond}>
            <main>
                <div className="search-box">
                <form onSubmit={handleSubmit}>
                    <div className="search-bars">
                        <input type="text" id="city" name="city" value={city}
                        placeholder="Enter a city"
                        onChange={(e) => {setCity(e.target.value)}} className="search-bar" ref={cityContainer}/>
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
                {hasResult && <Results displayData={displayData}></Results>}
            </main>
        </div>
    )
}

export default App;