// Step 1: Fetch the JSON data
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    // Step 2: Create the HTML markup
    const productListing = document.createElement('div');

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      
      const productTitle = document.createElement('h2');
      productTitle.innerText = product.title;
      productDiv.appendChild(productTitle);

      const productDescription = document.createElement('p');
      productDescription.innerText = product.description;
      productDiv.appendChild(productDescription);

      const productPrice = document.createElement('p');
      productPrice.innerText = `$${product.price}`;
      productDiv.appendChild(productPrice);

      const buyButton = document.createElement('button');
      buyButton.innerText = 'Buy Now';
      productDiv.appendChild(buyButton);

      productListing.appendChild(productDiv);
    });

    // Step 3: Add the HTML markup to the page
    document.body.appendChild(productListing);
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });
