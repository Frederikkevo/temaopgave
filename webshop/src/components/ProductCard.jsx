'use client';

import Link from 'next/link';

export default function ProductCard({ product, addToCart }) {
  return (
    <div
      className="border rounded shadow p-4 hover:shadow-lg transition flex flex-col justify-between"
    >
      <Link href={`/product/${product.id}`} className="block">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover mb-4 rounded"
        />
        <h2 className="font-bold text-lg mb-2">{product.title}</h2>
        <p className="font-bold text-blue-600">${product.price}</p>
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
      >
        Add to Basket
      </button>
    </div>
  );
}

