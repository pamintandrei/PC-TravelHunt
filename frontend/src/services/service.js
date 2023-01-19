export const routeService = {

    generateRoute: async (username) => {
        const rawResponse = await fetch(`http://127.0.0.1:8000/route?username=${username}`);
        return await rawResponse.json();
    },

    login: async (username, password) => {
        const rawResponse = await fetch('http://127.0.0.1:8090/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        });
        return rawResponse.text();
    },

    getAllReviews: async () => {
        const rawResponse = await fetch(`http://127.0.0.1:8090/reviews`, {
            method: 'GET',
            headers: {
                'Authorization': window.localStorage.getItem('token'),
            }
        });
        return await rawResponse.json();
    },

    saveReview: async (reviewText, stars, buildingId) => {
        const rawResponse = await fetch(`http://127.0.0.1:8090/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
            },
            body: JSON.stringify({reviewText: reviewText, stars: stars, buildingId: buildingId})
        });
        return await rawResponse.json();
    }



}