import NavbarClient from "./navbarClient";
import { getSession } from "@/actions";

const Navbar = async () => {
  const session = await getSession();
  return <NavbarClient isLoggedIn={session.isLoggedIn} />;
};

export default Navbar;