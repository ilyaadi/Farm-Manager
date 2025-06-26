// "use client";
// import Link from "next/link";
// import LogoutForm from "@/components/logoutForm";
// import { usePathname } from "next/navigation";
// import { useState, useRef } from "react";

// function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
//   const [open, setOpen] = useState(false);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setOpen(true);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => setOpen(false), 500); // 1s linger
//   };

//   return (
//     <div
//       className={`dropdown${open ? " show" : ""}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       tabIndex={0}
//       onFocus={handleMouseEnter}
//       onBlur={handleMouseLeave}
//     >
//       <span className="dropbtn">{label}</span>
//       <div className="dropdown-content">{children}</div>
//     </div>
//   );
// }

// const NavbarClient = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
//   const pathname = usePathname();
//   const [showNav, setShowNav] = useState(false);

//   // Show navbar if on homepage or not logged in
//   const showFullNavbar = pathname === "/" || !isLoggedIn;

//   if (showFullNavbar) {
//     return (
//       <nav>
//         <Link href="/">Homepage</Link>
//         {isLoggedIn ? (
//           <Dropdown label="Management">
//             <Link href="/fruitEntry">Produce Management</Link>
//             <Link href="/labourManagement">Labour Management</Link>
//             <Link href="/expenseEntry">Expense Management</Link>
//           </Dropdown>
//         ) : (
//           <span className="dropbtn disabled">Management</span>
//         )}
//         {isLoggedIn ? (
//           <Dropdown label="Report">
//             <Link href="/fruitReport">Produce Report</Link>
//             <Link href="/labourReport">Labour Report</Link>
//             <Link href="/expenseReport">Expense Report</Link>
//           </Dropdown>
//         ) : (
//           <span className="dropbtn disabled">Report</span>
//         )}
//         {!isLoggedIn && <Link href="/login">Login</Link>}
//         {!isLoggedIn && <Link href="/signup">SignUp</Link>}
//         {isLoggedIn && <LogoutForm />}
//       </nav>
//     );
//   }

//   return (
//     <div
//       className="nav-dots-wrapper"
//       onMouseEnter={() => setShowNav(true)}
//       onMouseLeave={() => setShowNav(false)}
//     >
//       <div className="nav-dots">
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//       {showNav && (
//         <nav className="nav-flyout">
//           <Link href="/">Homepage</Link>
//           <Dropdown label="Management">
//             <Link href="/fruitEntry">Produce Management</Link>
//             <Link href="/labourManagement">Labour Management</Link>
//             <Link href="/expenseEntry">Expense Management</Link>
//           </Dropdown>
//           <Dropdown label="Report">
//             <Link href="/fruitReport">Produce Report</Link>
//             <Link href="/labourReport">Labour Report</Link>
//             <Link href="/expenseReport">Expense Report</Link>
//           </Dropdown>
//           <LogoutForm />
//         </nav>
//       )}
//     </div>
//   );
// };

// export default NavbarClient;

"use client";
import Link from "next/link";
import LogoutForm from "@/components/logoutForm";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 500);
  };

  return (
    <div
      className={`dropdown${open ? " show" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <span className="dropbtn">{label}</span>
      <div className="dropdown-content">{children}</div>
    </div>
  );
}

const NavbarClient = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(false);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show navbar if on homepage or not logged in
  const showFullNavbar = pathname === "/" || !isLoggedIn;

  if (showFullNavbar) {
    return (
      <nav>
        <Link href="/">Homepage</Link>
        {isLoggedIn ? (
          <Dropdown label="Management">
            <Link href="/fruitEntry">Produce Management</Link>
            <Link href="/labourManagement">Labour Management</Link>
            <Link href="/expenseEntry">Expense Management</Link>
          </Dropdown>
        ) : (
          <span className="dropbtn disabled">Management</span>
        )}
        {isLoggedIn ? (
          <Dropdown label="Report">
            <Link href="/fruitReport">Produce Report</Link>
            <Link href="/labourReport">Labour Report</Link>
            <Link href="/expenseReport">Expense Report</Link>
          </Dropdown>
        ) : (
          <span className="dropbtn disabled">Report</span>
        )}
        {!isLoggedIn && <Link href="/login">Login</Link>}
        {!isLoggedIn && <Link href="/signup">SignUp</Link>}
        {isLoggedIn && <LogoutForm />}
      </nav>
    );
  }

  // Linger logic for 3-dots menu
  const handleNavMouseEnter = () => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    setShowNav(true);
  };

  const handleNavMouseLeave = () => {
    navTimeoutRef.current = setTimeout(() => setShowNav(false), 1500); // 1.5s linger
  };

  return (
    <div
      className="nav-dots-wrapper"
      onMouseEnter={handleNavMouseEnter}
      onMouseLeave={handleNavMouseLeave}
    >
      <div className="nav-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      {showNav && (
        <nav className="nav-flyout">
          <Link href="/">Homepage</Link>
          <Dropdown label="Management">
            <Link href="/fruitEntry">Produce Management</Link>
            <Link href="/labourManagement">Labour Management</Link>
            <Link href="/expenseEntry">Expense Management</Link>
          </Dropdown>
          <Dropdown label="Report">
            <Link href="/fruitReport">Produce Report</Link>
            <Link href="/labourReport">Labour Report</Link>
            <Link href="/expenseReport">Expense Report</Link>
          </Dropdown>
          <LogoutForm />
        </nav>
      )}
    </div>
  );
};

export default NavbarClient;