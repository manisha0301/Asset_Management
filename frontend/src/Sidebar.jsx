import React, { useState } from "react";
import { ChevronDown, Package, Users } from "lucide-react";
import image1 from "./assets/LOGO_KRISTELLAR_WHITE.png"

export default function Sidebar({
  sidebarVisible,
  currentPage,
  setCurrentPage,
}) {
  const [manageEmployeeOpen, setManageEmployeeOpen] = useState(false);
  const [requestModuleOpen, setRequestModuleOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <div
      className={`${
        sidebarVisible ? "w-64" : "w-0"
      } bg-slate-800 text-white transition-all duration-300 h-screen fixed ease-in-out overflow-y-auto`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2 flex-col">
          {/* <div className="w-12 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">KM</span>
          </div>
          <div>
            <span className="text-orange-500 font-bold text-2xl">KAS</span>
            <span className="text-white font-bold text-2xl">MA</span>
            <div className="text-xs text-gray-300">
              Kristellar Aerospace Strategic Management Assets
            </div>
          </div> */}
          <img src={image1} alt="Logo" className="w-full h-full" />
          <div className="text-md text-gray-300 font-bold">
              Asset Management System
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4 ">
        <ul className="space-y-1 ">
          <li>
            <button
              onClick={() => setCurrentPage("dashboard")}
              className={`flex items-center px-4 py-3 w-full text-left ${
                currentPage === "dashboard"
                  ? "text-blue-400 bg-slate-700"
                  : "text-gray-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <div className="w-5 h-5 mr-3">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
              </div>
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage("asset")}
              className={`flex items-center px-4 py-3 w-full text-left ${
                currentPage === "asset"
                  ? "text-blue-400 bg-slate-700"
                  : "text-gray-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <Package className="w-5 h-5 mr-3" />
              Asset
            </button>
          </li>
          {/* <li>
            <a href="#" className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700">
              <div className="w-5 h-5 mr-3">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18z"/>
                </svg>
              </div>
              Asset History
            </a>
          </li> */}
          <li>
            <button
              onClick={() => setCurrentPage("asset-sub-categories")}
              className={`flex items-center px-4 py-3 w-full text-left ${
                currentPage === "asset-sub-categories"
                  ? "text-blue-400 bg-slate-700"
                  : "text-gray-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <div className="w-5 h-5 mr-3">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              Asset Sub Categories
            </button>
          </li>
          {/* <li>
            <a href="#" className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700">
              <div className="w-5 h-5 mr-3">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              Asset Status
            </a>
          </li> */}
          {/* <li>
            <div className="px-4 py-3">
              <div 
                className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer"
                onClick={() => setManageEmployeeOpen(!manageEmployeeOpen)}
              >
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-3" />
                  Manage Employee
                </div>
                <ChevronDown className={`w-4 h-4 transform transition-transform ${manageEmployeeOpen ? 'rotate-180' : ''}`} />
              </div>
              {manageEmployeeOpen && (
                <div className="mt-2 ml-8 space-y-1">
                  <a href="#" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded">
                    Department
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded">
                    Sub-Department
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded">
                    Employee
                  </a>
                </div>
              )}
            </div>
          </li> */}
          <li>
            <div className="px-4 py-3">
              <div
                className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer"
                onClick={() => setRequestModuleOpen(!requestModuleOpen)}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z" />
                    </svg>
                  </div>
                  Request Module
                </div>
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform ${
                    requestModuleOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {requestModuleOpen && (
                <div className="mt-2 ml-8 space-y-1">
                  <button
                    onClick={() => setCurrentPage("asset-request")}
                    className={`block px-4 py-2 w-full text-left rounded ${
                      currentPage === "asset-request"
                        ? "text-blue-400 bg-slate-600"
                        : "text-gray-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    Asset Request
                  </button>
                  <button
                    onClick={() => setCurrentPage("asset-issue")}
                    className={`block px-4 py-2 w-full text-left rounded ${
                      currentPage === "asset-issue"
                        ? "text-blue-400 bg-slate-600"
                        : "text-gray-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    Asset Issue
                  </button>
                  {/* <a
                    href="#"
                    className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded"
                  >
                    Manage Supplier
                  </a> */}
                </div>
              )}
            </div>
          </li>
          <li>
            <div className="px-4 py-3">
              <div
                className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer"
                onClick={() => setReportOpen(!reportOpen)}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                    </svg>
                  </div>
                  Report
                </div>
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform ${
                    reportOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {reportOpen && (
                <div className="mt-2 ml-8 space-y-1">
                  <button
                    onClick={() => setCurrentPage("asset-status")}
                    className={`block px-4 py-2 w-full text-left rounded ${
                      currentPage === "asset-status"
                        ? "text-blue-400 bg-slate-600"
                        : "text-gray-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    Asset Status
                  </button>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded"
                  >
                    Asset Allocation
                  </a>
                </div>
              )}
            </div>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700"
            >
              <div className="w-5 h-5 mr-3">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              Manage Website
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
