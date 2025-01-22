const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname, 'assets')));

// Data
const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Phone', price: 800 },
  { id: 3, name: 'Tablet', price: 600 },
];

const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
];

// Routes

// GET /products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET /products/:id
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (!product) {
    res.status(404).send('Product not found');
  } else {
    res.json(product);
  }
});

// GET /users
app.get('/users', (req, res) => {
  const ageQuery = parseInt(req.query.age);
  if (ageQuery) {
    const filteredUsers = users.filter(user => user.age > ageQuery);
    res.json(filteredUsers);
  } else {
    res.json(users);
  }
});

// Route for about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'about.html'));
  });

  // Route for about page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'contact.html'));
  });

// 404 Error - Serve custom 404.html
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'assets', '404.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
