export async function roomDetailLoader({ params }) {
    const { roomId } = params;

    try {
        const response = await fetch(`http://127.0.0.1:8080/rooms/${roomId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch room details");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching room details:', error);
        throw new Response('Failed to load room details', { status: 500 });
    }
}
