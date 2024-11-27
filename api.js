document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const fetchButton = document.getElementById('fetch-button');
    if (fetchButton) {
        fetchButton.addEventListener('click', fetchProducts);
    } else {
        console.error('Fetch button not found');
    }
});
 
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const fetchButton = document.getElementById('fetch-button');
    if (fetchButton) {
        fetchButton.addEventListener('click', fetchProducts);
    } else {
        console.error('Fetch button not found');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const fetchButton = document.getElementById('fetch-button');
    if (fetchButton) {
        fetchButton.addEventListener('click', fetchProducts);
    } else {
        console.error('Fetch button not found');
    }
});

async function fetchProducts() {
    console.log('Fetch button clicked');
    const url = 'https://dummyjson.com/carts?limit=10';

    try {
        const response = await fetch(url);
        console.log('Response received');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Data parsed', data);

        const productList = document.getElementById('product-list');
        if (!productList) {
            throw new Error('Product list element not found');
        }

        productList.innerHTML = '';
        data.carts.forEach(cart => {
            cart.products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                `;
                productList.appendChild(productDiv);
            });
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        const productList = document.getElementById('product-list');
        if (productList) {
            productList.innerHTML = '<p style="color:red;">Failed to fetch products. Please try again later.</p>';
        } else {
            console.error('Product list element not found to display error message');
        }
    }
}
