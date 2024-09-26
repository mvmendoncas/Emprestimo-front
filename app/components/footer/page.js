// components/Footer.js

import {usePathname} from "next/navigation";

const Footer = () => {

    const pathName = usePathname();

    if (pathName === "/" || pathName === "/newuser" || pathName === "/agiota/create" || pathName === "/customer/create") {
        return null
    }
    return (
      <footer className="bg-dark text-white py-2 px-1 mt-auto">
        <p className="p-0 m-0">© 2024 Agiota. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  