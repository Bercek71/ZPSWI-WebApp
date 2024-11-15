import { useState, useEffect } from 'react';
import Config from "../config.jsx";

export default function useCityLoader() {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(Config.webApiUrl + '/cities');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    return { cities };
}
