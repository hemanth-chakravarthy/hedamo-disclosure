import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../app/components/Layout/Header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-gray-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="text-sm text-gray-600">
              Hedamo Disclosure System | All information is producer-reported.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}