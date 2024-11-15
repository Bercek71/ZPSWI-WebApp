import Config from "../config.jsx";

export async function roomListLoader({ params }) {
    const { hotelId } = params;

    try {

        const hotelResponse = await fetch(`${Config.webApiUrl}/hotels/${hotelId}`);
        if (!hotelResponse.ok) {
            throw new Error("Failed to fetch hotel details");
        }
        const hotel = await hotelResponse.json();

        const roomResponse = await fetch(`http://127.0.0.1:8080/rooms`);
        if (!roomResponse.ok) {
            throw new Error("Failed to fetch rooms");
        }
        const rooms = await roomResponse.json();

        const filteredRooms = rooms.filter(room => room.hotel.id === parseInt(hotelId));

        const reviewResponse = await fetch('http://127.0.0.1:8080/Reviews');
        if (!reviewResponse.ok) {
            throw new Error("Failed to fetch reviews");
        }
        const reviews = await reviewResponse.json();

        const roomsWithReviews = filteredRooms.map(room => ({
            ...room,
            reviews: reviews.filter(review => review.roomId === room.id)
        }));

        return { hotel, rooms: roomsWithReviews };
    } catch (error) {
        console.error('Error fetching room and review data:', error);
        throw new Response('Failed to load rooms and reviews', { status: 500 });
    }
}
