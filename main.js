// Function to fetch ISS data from the API
async function fetchISSData() {
    const response = await fetch('http://api.open-notify.org/iss-now.json');
    const data = await response.json();
    return data;
}

// Function to update ISS location on the map
function updateISSPosition(latitude, longitude) {
    const mapElement = document.getElementById('map');
    // Clear previous marker if any
    mapElement.innerHTML = '';

    // Create a map using Leaflet (you need to include Leaflet script in your HTML)
    const map = L.map(mapElement).setView([latitude, longitude], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Current ISS Location')
        .openPopup();
}

// Function to update UI with ISS data
async function updateUI() {
    try {
        const issData = await fetchISSData();
        const { latitude, longitude } = issData.iss_position;
        const altitude = issData.iss_position.altitude.toFixed(2);

        // Update HTML elements with fetched data
        document.getElementById('latitude').textContent = latitude;
        document.getElementById('longitude').textContent = longitude;
        document.getElementById('altitude').textContent = altitude;

        // Update the ISS position on the map
        updateISSPosition(latitude, longitude);

        // Set timer to update location every 20 seconds
        setTimeout(updateUI, 20000); // 20 seconds
    } catch (error) {
        console.error('Error fetching ISS data:', error);
    }
}

// Initialize UI update on page load
updateUI();
