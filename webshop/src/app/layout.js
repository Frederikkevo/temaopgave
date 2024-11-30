import "../styles/globals.css";

export const metadata = {
  title: "Webshop",
  description: "En simpel webshop med kurv og filtrering",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body className="bg-gray-100 text-gray-800">
        {children}
      </body>
    </html>
  );
}
