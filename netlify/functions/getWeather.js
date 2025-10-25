// This 'exports.handler' is the required entry point for Netlify
exports.handler = async function (event, context) {

    // 1. Get the city from the front-end's request
    const city = event.queryStringParameters.city;

    // 2. Get your secret API key from the environment
    // This is where it securely reads the key you set in Step 1
    const API_KEY = process.env.WEATHER_API_KEY;

    // 3. Build the secure URL to call the real API
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    try {
        // 4. Call the real weather API (this 'fetch' runs on the server)
        const response = await fetch(url);
        const data = await response.json();

        // 5. Send the data back to your front-end
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        // 6. Send back an error if something went wrong
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch weather' })
        };
    }
};