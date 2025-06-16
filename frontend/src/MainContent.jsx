import React from 'react';
import { Menu, User, Package, Building } from 'lucide-react';

export default function MainContent({ setSidebarVisible, sidebarVisible, currentPage }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-8">Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Assets */}
            <div className="bg-blue-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">2</div>
                  <div className="text-blue-100 mt-1">Total Assets</div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <Package className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Total Departments */}
            <div className="bg-red-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">8</div>
                  <div className="text-red-100 mt-1">Total Departments</div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <Building className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Total Suppliers */}
            {/* <div className="bg-blue-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-blue-100 mt-1">Total Suppliers</div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <Package className="w-8 h-8" />
                </div>
              </div>
            </div> */}

            {/* Total Employees */}
            <div className="bg-blue-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-red-100 mt-1">Total Employees</div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <User className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}