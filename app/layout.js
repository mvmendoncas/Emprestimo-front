"use client"

import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/page';
import Footer from './components/footer/page';
import Providers from './components/Providers';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
