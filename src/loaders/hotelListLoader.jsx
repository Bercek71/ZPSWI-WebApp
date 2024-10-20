// loaders/hotelListLoader.jsx
export async function hotelListLoader({ params }) {
    const { countryId } = params;

    try {
        const response = await fetch('http://127.0.0.1:8080/hotels');
        const data = await response.json();
        const filteredHotels = data.filter(hotel => hotel.country.id === parseInt(countryId));

        return { hotels: filteredHotels, countryId };
    } catch (error) {
        console.error('Error fetching hotels:', error);
        throw new Error('Failed to load hotels');
    }
}
