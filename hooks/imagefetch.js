// imagefetch.js

// Function to fetch image data from the API URL
async function fetchImages() {
    try {
        const response = await fetch('https://digitalgita.cyberspacedigital.in/api/fetchImages.php');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}

// Export the fetchImages function
export { fetchImages };
