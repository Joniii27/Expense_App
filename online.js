const onlineApi = "https://dummyjson.com/carts?limit=10";

async function fetchCarts() {
    try {
        const response = await fetch(onlineApi);
        
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`Error retrieving the carts: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error("Error retrieving the carts:", error);
        alert("Error retrieving the carts");
    }
}

// Initialize the carts variable
let carts = [];

// Fetch carts and log them
fetchCarts().then(data => {
    if (data) {
        carts = data;
        console.log(carts); // You can use the carts variable here or in other functions
    }
}).catch(error => {
    console.error("Failed to fetch carts:", error);
});
