import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Velkommen til alt muligt Shoppen</h1>
      <Link
        href="/products"
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Gå til produkter
      </Link>
    </div>
  );
}
