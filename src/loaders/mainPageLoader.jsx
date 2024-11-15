import Config from "../config";

export async function mainPageLoader() {
    const response = await fetch(Config.webApiUrl + "/rooms");
    if (response.ok) {
        return response.json();
    } else {
        throw new Response("Not Found")
    }
}