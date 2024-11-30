import Link from 'next/link';

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover mb-4 rounded"
        />
        <h2 className="font-bold text-lg">{product.title}</h2>
      </Link>
      <p className="text-gray-700">{product.price} DKK</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Tilføj til kurv
      </button>
    </div>
  );
}
