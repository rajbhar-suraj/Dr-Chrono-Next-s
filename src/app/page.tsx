"use client";

import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* Sidebar */}
          

      {/* Main Dashboard */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome to Cerbo Dashboard
        </h1>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Total Patients</h2>
            <p className="text-3xl font-bold text-blue-600">1,240</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Upcoming Appointments</h2>
            <p className="text-3xl font-bold text-green-600">32</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-gray-500 text-sm">Pending Bills</h2>
            <p className="text-3xl font-bold text-red-600">15</p>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Patients</h2>
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="pb-2">Name</th>
                <th className="pb-2">DOB</th>
                <th className="pb-2">Last Visit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">John Doe</td>
                <td className="py-2">1988-04-12</td>
                <td className="py-2">2025-09-10</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Jane Smith</td>
                <td className="py-2">1990-07-22</td>
                <td className="py-2">2025-09-14</td>
              </tr>
              <tr>
                <td className="py-2">Michael Lee</td>
                <td className="py-2">1975-01-05</td>
                <td className="py-2">2025-09-15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
