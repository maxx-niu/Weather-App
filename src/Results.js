import React, {useState} from "react";
import Switch from "./Switch";

export default function Results({children, displayData}) {
    const [isToggleFarenheit, setIsToggleFarenheit] = useState(false);

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
    <>
        <div className="location-box">
            <div className="location">{displayData.name}, {displayData.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
            <div className="temp">
                <Switch isToggled={isToggleFarenheit} onToggle={
                () => {
                   setIsToggleFarenheit(!isToggleFarenheit);
                }
                }></Switch>
                {!isToggleFarenheit ? Math.round(displayData.main.temp*2)/2 + "°C" : 
                    Math.round((displayData.main.temp*2))/2*9/5+32 + "°F"}
            </div>
            <div className="weather">{displayData.weather[0].main}</div>
        </div>
    </>
  )
}
