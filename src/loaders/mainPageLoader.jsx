export async function mainPageLoader() {
    const response = await fetch("http://localhost:8080/rooms");
    if (response.ok) {
        return response.json();
    } else {
        throw new Response("Not Found")
    }
}