const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Route to fetch temperature based on postal code
app.get('/temperature/:plz', async (req, res) => {
    const { plz } = req.params;

    // Validate postal code input
    if (!/^[0-9]{4}$/.test(plz)) {
        return res.status(400).json({ error: 'Invalid postal code format. Must be 4 digits.' });
    }

    // Construct the URL with the postal code
    const apiUrl = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: `Error fetching data: ${response.statusText}` });
        }

        const data = await response.json();

        // Extract temperature information (assuming the API response contains temperature data)
        if (data && data.currentWeather && data.currentWeather.temperature) {
            const temperature = data.currentWeather.temperature;
            return res.json({ plz, temperature });
        } else {
            return res.status(404).json({ error: 'Temperature data not found for the given postal code.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
