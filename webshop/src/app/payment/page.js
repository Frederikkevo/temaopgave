'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const items = JSON.parse(decodeURIComponent(searchParams.get('items') || '[]'));
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (items.length > 0) {
      Promise.all(
        items.map((id) =>
          fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json())
        )
      ).then((data) => setProducts(data));
    }
  }, [items]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Betalingsside</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.price} DKK</p>
        </div>
      ))}
    </div>
  );
}
