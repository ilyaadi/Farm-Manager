import Link from "next/link";
import LogoutForm from "@/components/logoutForm";
import { getSession } from "@/actions";

const Navbar = async () => {
    const session = await getSession();
    console.log(session);

    return (
        <nav>
            <Link href="/">Homepage</Link>
            {session.isLoggedIn ? <Link href="/expenseEntry">ExpenseManagement</Link> : <Link href="">ExpenseManagement</Link>}
            {session.isLoggedIn ? <Link href="/expenseReport">ExpenseReport</Link> : <Link href="">ExpenseReport</Link>}
            {session.isLoggedIn ? <Link href="/labourManagement">LabourManagement</Link> : <Link href="">LabourManagement</Link>}
            {session.isLoggedIn ? <Link href="/labourReport">LabourReport</Link> : <Link href="">LabourReport</Link>}
            {session.isLoggedIn ? <Link href="/fruitEntry">FruitEntry</Link> : <Link href="">FruitEntry</Link>}
            {session.isLoggedIn ? <Link href="/fruitReport">FruitReport</Link> : <Link href="">FruitReport</Link>}
            {session.isLoggedIn ? <Link href=""></Link> : <Link href="/login">Login</Link>}
            {session.isLoggedIn ? <Link href=""></Link> : <Link href="/signup">SignUp</Link>}
            {session.isLoggedIn && <LogoutForm />}
        </nav>
    );
}

export default Navbar;
