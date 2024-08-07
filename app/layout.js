import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Agiota App',
  description: 'Welcome to the Agiota application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
