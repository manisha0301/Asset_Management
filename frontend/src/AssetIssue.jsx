import { useState } from 'react';
import { FileText, Printer, Copy, Download, } from 'lucide-react';

export default function AssetIssueList() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Asset Issue List</h1>
          <div className="text-sm text-gray-500">
            Dashboard / Manage
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Add
              </button>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <FileText className="w-4 h-4" />
                  <span>Excel</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <FileText className="w-4 h-4" />
                  <span>CSV</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <label htmlFor="search" className="text-sm text-gray-600 mr-2">Search:</label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search assets..."
              />
            </div>
          </div>
        </div>
      </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">
                    <div className="flex items-center space-x-1">
                        <span>Id</span>
                        <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14l5-5 5 5z"/>
                        </svg>
                    </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">Asset</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">
                    <div className="flex items-center space-x-1">
                        <span>Raised By Employee</span>
                        <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14l5-5 5 5z"/>
                        </svg>
                    </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">
                    <div className="flex items-center space-x-1">
                        <span>Issue Description</span>
                        <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14l5-5 5 5z"/>
                        </svg>
                    </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">
                    <div className="flex items-center space-x-1">
                        <span>Status</span>
                        <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14l5-5 5 5z"/>
                        </svg>
                    </div>
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">Expected Date</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">Resolved Date</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-600">Action</th>
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
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                    Showing 1 to 1 of 1 entries
                    </div>
                    <div className="flex items-center space-x-2">
                    <button 
                        disabled 
                        className="px-3 py-1 text-sm text-gray-400 bg-gray-100 border border-gray-300 rounded cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button className="px-3 py-1 text-sm text-white bg-blue-500 border border-blue-500 rounded">
                        1
                    </button>
                    <button 
                        disabled 
                        className="px-3 py-1 text-sm text-gray-400 bg-gray-100 border border-gray-300 rounded cursor-not-allowed"
                    >
                        Next
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}