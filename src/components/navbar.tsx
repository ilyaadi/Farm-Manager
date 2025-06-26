// import Link from "next/link";
// import LogoutForm from "@/components/logoutForm";
// import { getSession } from "@/actions";

// const Navbar = async () => {
//   const session = await getSession();

//   return (
//     <nav>
//       <Link href="/">Homepage</Link>

//       {/* Management Dropdown */}
//       <div className="dropdown">
//         <span className="dropbtn">Management</span>
//         <div className="dropdown-content">
//           <Link href="/fruitEntry">Produce Management</Link>
//           <Link href="/labourManagement">Labour Management</Link>
//           <Link href="/expenseEntry">Expense Management</Link>
//         </div>
//       </div>

//       {/* Report Dropdown */}
//       <div className="dropdown">
//         <span className="dropbtn">Report</span>
//         <div className="dropdown-content">
//           <Link href="/fruitReport">Produce Report</Link>
//           <Link href="/labourReport">Labour Report</Link>
//           <Link href="/expenseReport">Expense Report</Link>
//         </div>
//       </div>

//       {!session.isLoggedIn && <Link href="/login">Login</Link>}
//       {!session.isLoggedIn && <Link href="/signup">SignUp</Link>}
//       {session.isLoggedIn && <LogoutForm />}
//     </nav>
//   );
// };

// export default Navbar;

import Link from "next/link";
import LogoutForm from "@/components/logoutForm";
import { getSession } from "@/actions";

const Navbar = async () => {
  const session = await getSession();

  return (
    <nav>
      <Link href="/">Homepage</Link>

      {/* Management Dropdown */}
      {session.isLoggedIn ? (
        <div className="dropdown">
          <span className="dropbtn">Management</span>
          <div className="dropdown-content">
            <Link href="/fruitEntry">Produce Management</Link>
            <Link href="/labourManagement">Labour Management</Link>
            <Link href="/expenseEntry">Expense Management</Link>
          </div>
        </div>
      ) : (
        <span className="dropbtn disabled">Management</span>
      )}

      {/* Report Dropdown */}
      {session.isLoggedIn ? (
        <div className="dropdown">
          <span className="dropbtn">Report</span>
          <div className="dropdown-content">
            <Link href="/fruitReport">Produce Report</Link>
            <Link href="/labourReport">Labour Report</Link>
            <Link href="/expenseReport">Expense Report</Link>
          </div>
        </div>
      ) : (
        <span className="dropbtn disabled">Report</span>
      )}

      {!session.isLoggedIn && <Link href="/login">Login</Link>}
      {!session.isLoggedIn && <Link href="/signup">SignUp</Link>}
      {session.isLoggedIn && <LogoutForm />}
    </nav>
  );
};

export default Navbar;