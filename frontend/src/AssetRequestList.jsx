import React, { useState } from 'react';
import { Edit, Trash2, Copy, Download, FileText, Printer } from 'lucide-react';

export default function AssetRequestList() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data - replace with your actual data
  const assetRequests = [
    {
      id: 1,
      asset: 'DELL INSPIRON 14',
      requestedEmployee: 'Radhika Gandhi',
      approvedByEmployee: 'Rakesh Jain',
      status: 'Available',
      requestDate: '2023-06-10',
      receiveDate: '2023-06-12'
    }
  ];

  const filteredRequests = assetRequests.filter(request =>
    request.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.requestedEmployee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.approvedByEmployee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Asset Request List</h1>
        <div className="flex items-center text-sm text-gray-500">
          <span>Dashboard</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Manage</span>
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
                <th className="px-6 py-3 text-left font-medium text-gray-600 ">
                  Id
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 ">
                  Asset
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 ">
                  Requested Employee
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 ">
                  Approved By Employee
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 ">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 ">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 ">
                  Receive Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {request.asset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {request.requestedEmployee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {request.approvedByEmployee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {request.requestDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {request.receiveDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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