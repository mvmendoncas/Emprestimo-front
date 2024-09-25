// components/Footer.js

import {usePathname} from "next/navigation";

const Footer = () => {

    const pathName = usePathname();

    if (pathName === "/" || pathName === "/newuser" || pathName === "/agiota/create" || pathName === "/customer/create") {
        return null
    }
    return (
      <footer className="bg-blue-800 text-white p-4 mt-auto">
        <p>© 2024 Agiota. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  