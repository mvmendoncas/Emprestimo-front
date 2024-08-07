// pages/index.js
import Header from './components/Header';
import Footer from './components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
    
      <main className="flex-grow p-4">
        <h2 className="text-xl">Welcome to the Agiota application</h2>
        <p>This is a basic welcome page.</p>
      </main>
   
    </div>
  );
};

export default Home;
