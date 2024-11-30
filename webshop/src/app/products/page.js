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

  useEffect(() => {
    // Fetch products
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      });

    // Fetch categories
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories([{ name: 'All', slug: 'all' }, ...data.map((cat) => ({ name: cat, slug: cat }))]); // Sikrer unikke værdier
      });
  }, []);

  const handleFilter = (slug) => {
    if (slug === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === slug));
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(value)
      )
    );
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Produkter</h1>
        <div
          className="relative"
          onMouseEnter={() => setShowCart(true)}
          onMouseLeave={() => setShowCart(false)}
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Kurv ({cart.length})
          </button>
          {showCart && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-64">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={`cart-${item.id}`} className="flex justify-between items-center p-2">
                    <span>{item.title}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Fjern
                    </button>
                  </div>
                ))
              ) : (
                <p className="p-2">Kurven er tom</p>
              )}
              {cart.length > 0 && (
                <Link
                  href={`/payment?items=${encodeURIComponent(JSON.stringify(cart.map((item) => item.id)))}`}
                  className="block bg-green-500 text-white text-center py-2"
                >
                  Betal nu
                </Link>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="flex gap-4 mb-6">
        <select onChange={(e) => handleFilter(e.target.value)} className="p-2 border rounded">
          {categories.map((category) => (
            <option key={`category-${category.slug}`} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Søg efter produkter..."
          className="p-2 border rounded flex-1"
        />
      </div>

      <ProductList products={filteredProducts} addToCart={addToCart} />
    </div>
  );
}
