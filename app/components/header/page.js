import Link from "next/link";


const Header = () => {
    return (
      <header className="bg-blue-800 text-white p-4">
        <Link href="/">
        <h1 className="text-2xl">Agiota</h1>
        </Link>
      </header>
    );
  };
  
  export default Header;
  