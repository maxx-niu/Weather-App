import React from 'react'

export default function Results({hasResult, children, displayData, toggleFarenheit}) {
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

    if(!hasResult) {
        return null;
    }
    
  return (
    <>
        <div className="location-box">
            <div className="location">{displayData.name}, {displayData.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
            <div className="temp">15</div>
            <div className="weather">Sunny</div>
        </div>
        {toggleFarenheit && <div>FARENHEIT TOGGLED</div>}
    </>
  )
}
