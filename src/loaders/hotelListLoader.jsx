// loaders/hotelListLoader.jsx
export async function hotelListLoader({ params, request }) {
    const { countryId } = params;

    const url = new URL(request.url);
    const checkIn = url.searchParams.get('checkIn');
    const checkOut = url.searchParams.get('checkOut');
    const guests = url.searchParams.get('guests');
    const cityId = url.searchParams.get('cityId');

    try {
        const apiUrl = new URL('http://127.0.0.1:8080/hotels');

        if (checkIn) apiUrl.searchParams.append('checkIn', checkIn);
        if (checkOut) apiUrl.searchParams.append('checkOut', checkOut);
        if (guests) apiUrl.searchParams.append('guests', guests);
        if (cityId) apiUrl.searchParams.append('cityId', cityId);
        if (countryId) apiUrl.searchParams.append('countryId', countryId);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const filteredHotels = data.filter(hotel =>
            !countryId || hotel.country.id === parseInt(countryId)
        );

        return { hotels: filteredHotels, countryId };
    } catch (error) {
        console.error('Error fetching hotels:', error);
        throw new Error('Failed to load hotels');
    }
}
