import Link from 'next/link';

export default function ProductList({ products, addToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded shadow p-4 hover:shadow-lg transition"
        >
          <Link href={`/product/${product.id}`} className="block">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="font-bold text-lg">{product.title}</h2>
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full"
          >
            Add to Basket
          </button>
        </div>
      ))}
    </div>
  );
}
