import { useState } from 'react';

export default function useHotelSearch({ hotels, checkIn, checkOut, guests, cityId }) {
    const [filteredHotels, setFilteredHotels] = useState(hotels);

    const handleSearch = async () => {
        const searchParams = new URLSearchParams();
        if (checkIn) searchParams.append('checkIn', checkIn);
        if (checkOut) searchParams.append('checkOut', checkOut);
        if (guests) searchParams.append('guests', guests);
        if (cityId) searchParams.append('cityId', cityId);

        try {
            const response = await fetch(`http://127.0.0.1:8080/hotels?${searchParams.toString()}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFilteredHotels(data);
        } catch (error) {
            console.error('Error fetching filtered hotels:', error);
        }
    };

    return { filteredHotels, handleSearch };
}