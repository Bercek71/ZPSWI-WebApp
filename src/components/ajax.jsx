
export async function ajaxGet(url) {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if(!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
    }

    return await response.json();
}

export async function ajaxPost(url, data) {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if(!response.ok) {
        throw new Error(`Failed to save data: ${response.status}`);
    }

    return await response.json();
}

export async function ajaxPut(url, data) {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if(!response.ok) {
        throw new Error(`Failed to save data: ${response.status}`);
    }

    return await response.json();
}

export async function ajaxDelete(url) {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if(!response.ok) {
        throw new Error(`Failed to delete data: ${response.status}`);
    }

    return await response.json();
}

export async function ajaxValidateToken(token) {
    const response = await fetch(Config.webApiUrl + '/validateToken', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if(!response.ok) {
        throw new Error(`Failed to validate token: ${response.status}`);
    }
    const json = await response.json();
    localStorage.setItem('token', json.token);
}

export async function ajaxLogin(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if(!response.ok) {
        throw new Error(`Failed to login: ${response.status}`);
    }

    return await response.json();
}

export async function ajaxRegister(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(response)

    if(!response.ok) {
        throw new Error(`Failed to register: ${response.status}`);
    }

    return await response.json();
}