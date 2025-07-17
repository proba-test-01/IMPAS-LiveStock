const productTableBody = document.querySelector('#product-table tbody');
const searchInput = document.getElementById('search-product');

function loadProducts() {
  getProducts(products => {
    displayProducts(products);
  });
}

function displayProducts(products) {
  productTableBody.innerHTML = '';
  const searchTerm = searchInput.value.toLowerCase();
  for (const [code, product] of Object.entries(products)) {
    if (product.name.toLowerCase().includes(searchTerm) || code.toLowerCase().includes(searchTerm)) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${code}</td>
        <td>${product.name}</td>
        <td>${product.priceBgn.toFixed(2)}</td>
        <td>${product.priceEur.toFixed(2)}</td>
        <td>${product.stock}</td>
        <td><img src="${product.image}" alt="${product.name}" width="50"/></td>
      `;
      productTableBody.appendChild(tr);
    }
  }
}

searchInput.addEventListener('input', () => {
  loadProducts();
});
