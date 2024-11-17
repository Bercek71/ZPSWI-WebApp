// loaders/hotelListLoader.jsx
import Config from '../config.jsx';
export async function hotelListLoader({checkIn, checkOut, guests, cityId}) {
    try {
      const response = await fetch(`${Config.webApiUrl}/hotels?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&cityId=${cityId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to load hotels');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching hotels:', error);
        throw new Error('Failed to load hotels');
    }
}
