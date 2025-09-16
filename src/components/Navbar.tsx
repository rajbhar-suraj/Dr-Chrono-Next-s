"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const resources = [
  { name: "Patients", path: "/patients" },
  { name: "Appointments", path: "/appointments" },
  { name: "Billing", path: "/billing" },
  { name: "Clinical", path: "/clinical" },
];
// { name: "Calendar", path: "/calendar" },
//   { name: "Dashboard", path: "/" },

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="position top-0 rounded-2xl bg-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href={"/"} className="text-lg font-semibold text-gray-700">
            EHR
          </Link>

          {/* Links */}
          <ul className="flex space-x-4">
            {resources.map((res) => (
              <li key={res.path}>
                <Link
                  href={res.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === res.path
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {res.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
