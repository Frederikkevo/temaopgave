'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const params = useParams(); // Access params using useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (params && params.id) { // Access the id property safely
          const res = await fetch(`https://dummyjson.com/products/${params.id}`);
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [params]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-64 object-cover mb-6 rounded"
      />
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-lg font-bold">${product.price}</p>
      <button
        onClick={() => router.back()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Products
      </button>
    </div>
  );
}
