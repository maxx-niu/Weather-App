import React, {useState} from "react";
import Modal from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

// API documentation: https://openweathermap.org/current
const defaultConfig = {
    city: "Waterloo",
    country: "Canada"
}

const App = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(city && country){
            // on user input
            setIsOpen(false);
            const fetchURL = process.env.REACT_APP_BASE_URL + 'weather?q=' + city + ',' + country + '&appid=' + process.env.REACT_APP_API_KEY;
            fetch(fetchURL)
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error('something went wrong, status: ' + res.status);
                })
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            // if user didn't enter valid city/country, 
            setIsOpen(true);
        }
        setCity('');
        setCountry('');
    }

    return <>
        <h1>Hello</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="city">City : </label>
                <input type="text" id="city" name="city" value={city}
                placeholder={defaultConfig.city}
                onChange={(e) => {setCity(e.target.value)}} />
            </div>
            <div>
                <label htmlFor="country">Country : </label>
                <input type="text" id="country" name="country" value={country}
                placeholder={defaultConfig.country}
                onChange={(e) => {setCountry(e.target.value)}} />
            </div>
            <button type='submit'>Submit</button>
        </form>
        <Modal open={isOpen} onClose={() => {setIsOpen(false)}}>
            Please input a valid city and country!
        </Modal>
        {/* <h2>{process.env.REACT_APP_API_KEY}</h2> */}
    </>
}

export default App