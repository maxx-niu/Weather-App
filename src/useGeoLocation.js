import React, {useEffect, useState} from 'react'

export const useGeoLocation = () => {
    const[locationData, setLocationData] = useState({
        loaded: false, 
        coordinates: {lat: "", lng: ""}
    });

    const onSuccess = (location) => {
        setLocationData({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        })
    };

    const onError = (error) => {
        setLocationData({
            loaded: true,
            error
        })
    }

    useEffect(() => {
        // check if browser supports GeoLocation API
        if(!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return locationData;
}
