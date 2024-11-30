import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <nav className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold">Webshop</Link>
        <Link href="/products" className="hover:underline">Produkter</Link>
      </nav>
    </header>
  );
}
