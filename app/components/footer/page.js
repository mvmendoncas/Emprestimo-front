import {usePathname} from "next/navigation";

const Footer = () => {

    const pathName = usePathname();

    if (pathName === "/" || pathName === "/newuser" || pathName === "/agiota/create" || pathName === "/customer/create") {
        return null
    }
    return (
        <footer className="bg-dark text-white py-2 px-1 mt-auto">
            <p className="p-0 m-0">© 2024.1 A.G.I.O.T.A All rights reserved.</p>
            <p className="p-0 m-0">Programação Web 2024.1</p>
            <p className="p-0 m-0">Ana Beatriz | Caio Vinicius | Jonas Junior | Maria Virginia</p>
        </footer>
    );
};

export default Footer;
  