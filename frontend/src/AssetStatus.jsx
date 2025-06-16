import React, { useState } from 'react';

export default function AssetStatus() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = () => {
    // Filter logic would go here
    console.log('Filtering with dates:', fromDate, toDate);
  };

  const handleExport = (type) => {
    // Export logic would go here
    console.log('Exporting as:', type);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Asset Status</h1>
          <nav className="text-sm text-gray-500">
            <span>Dashboard</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Asset Status</span>
          </nav>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="dd-mm-yyyy"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="dd-mm-yyyy"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Click to Filter
            </label>
            <button
              onClick={handleFilter}
              className="w-full bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Export and Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleExport('copy')}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Copy
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Excel
            </button>
            <button
              onClick={() => handleExport('csv')}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              CSV
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              PDF
            </button>
            <button
              onClick={() => handleExport('print')}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Print
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Search:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search assets..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    Id
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M7 10l5 5 5-5"/>
                    </svg>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    Asset Model No
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M7 10l5 5 5-5"/>
                    </svg>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    Asset Name
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M7 10l5 5 5-5"/>
                    </svg>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    Category
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M7 10l5 5 5-5"/>
                    </svg>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    Sub Category
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M7 10l5 5 5-5"/>
                    </svg>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">
                  <div className="flex items-center gap-2">
                    Supplier
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M7 10l5 5 5-5"/>
                    </svg>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">Image</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 bg-gray-50">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="text-center py-12 text-gray-500">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <div>
            Showing 0 to 0 of 0 entries
          </div>
          <div className="flex gap-2">
            <button
              disabled
              className="px-3 py-1 border border-gray-300 rounded bg-gray-100 text-gray-400 cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled
              className="px-3 py-1 border border-gray-300 rounded bg-gray-100 text-gray-400 cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}