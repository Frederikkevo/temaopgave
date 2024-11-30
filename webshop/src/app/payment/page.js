'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const itemsParam = searchParams.get('items');
    if (itemsParam) {
      const itemIds = JSON.parse(decodeURIComponent(itemsParam));
      fetch(`https://dummyjson.com/products`)
        .then((res) => res.json())
        .then((data) => {
          const selectedProducts = data.products.filter((product) =>
            itemIds.includes(product.id)
          );
          setCartItems(selectedProducts);
          const totalAmount = selectedProducts.reduce((sum, item) => sum + item.price, 0);
          setTotal(totalAmount);
        });
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-4">Betaling</h1>
      <button
        onClick={() => router.push('/products')}
        className="mb-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        ← Tilbage til Produkter
      </button>
      <div className="bg-white shadow-md rounded p-6">
        <ul>
          {cartItems.map((item) => (
            <li
              key={`payment-${item.id}`}
              className="flex justify-between items-center py-2"
            >
              <span>{item.title}</span>
              <span>{item.price} DKK</span>
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total:</span>
          <span>{total} DKK</span>
        </div>
      </div>
      <div className="mt-6">
        <label className="block mb-2">Kortinformation:</label>
        <input
          type="text"
          placeholder="Kortnummer"
          className="p-2 border rounded w-full mb-4"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
          Betal nu
        </button>
      </div>
    </div>
  );
}
