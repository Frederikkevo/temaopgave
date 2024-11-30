import Link from 'next/link';

export default async function ProductDetailsPage({ params }) {
  const { id } = params;

  const product = await fetch(`https://dummyjson.com/products/${id}`).then((res) =>
    res.json()
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <Link href="/products" className="text-blue-500 hover:underline">
        ← Tilbage til Produkter
      </Link>
      <div className="mt-6 flex gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-64 h-64 object-cover border rounded"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-xl font-bold mt-4">{product.price} DKK</p>
        </div>
      </div>
    </div>
  );
}
