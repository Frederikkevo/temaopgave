import ProductCard from './ProductCard';

export default function ProductList({ products, addToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={`product-${product.id}`} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}
