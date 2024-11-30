'use client';

import { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [showCart, setShowCart] = useState(false);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsRes = await fetch('https://dummyjson.com/products');
        const productsData = await productsRes.json();
        setProducts(productsData.products);
        setFilteredProducts(productsData.products);

        // Fetch categories
        const categoriesRes = await fetch('https://dummyjson.com/products/categories');
        const categoriesData = await categoriesRes.json();
        const processedCategories = ['All', ...categoriesData.map((cat) => String(cat))];
        setCategories(processedCategories); // Ensure categories are valid strings
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter products by category
  const handleFilter = (category) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  // Search products
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(value)
      )
    );
  };

  // Add to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <div
          className="relative"
          onMouseEnter={() => setShowCart(true)}
          onMouseLeave={() => setShowCart(false)}
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Cart ({cart.length})
          </button>
          {showCart && (
            <div
              className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-64"
              onMouseEnter={() => setShowCart(true)} // Keep the dropdown open
              onMouseLeave={() => setShowCart(false)} // Close when mouse leaves
            >
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2">
                    <span>{item.title}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="p-2">Cart is empty</p>
              )}
              {cart.length > 0 && (
                <Link
                  href={`/payment?items=${encodeURIComponent(
                    JSON.stringify(cart.map((item) => item.id))
                  )}`}
                  className="block bg-green-500 text-white text-center py-2"
                >
                  Proceed to Payment
                </Link>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="flex gap-4 mb-6">
        <select
          onChange={(e) => handleFilter(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map((category, index) => (
            <option key={`category-${index}`} value={category}>
              {typeof category === 'string'
                ? category.charAt(0).toUpperCase() + category.slice(1)
                : ''}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search products..."
          className="p-2 border rounded flex-1"
        />
      </div>

      <ProductList products={filteredProducts} addToCart={addToCart} />
    </div>
  );
}
