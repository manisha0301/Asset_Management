import React, { useState } from 'react';
import { Edit3, Trash2, Copy, Download, FileText, Printer } from 'lucide-react';
import AssetSubCategoryModal from './AssetSubCategoryModal';

export default function AssetSubCategories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSubCategory = (formData) => {
    // Add the new sub category to the state
    setSubCategories(prev => [...prev, { 
      id: Date.now(), 
      assetCategory: formData.category, 
      subCategory: formData.subCategoryName, 
      description: formData.description 
    }]);
    setIsModalOpen(false);
  };

  const assetSubCategories = [
    {
      id: 1,
      assetCategory: 'Electronics',
      subCategory: 'Laptop Charger Lenovo',
      description: 'Laptop Charger Lenovo Pvt Ltd.'
    },
    {
      id: 2,
      assetCategory: 'Non-Electronics',
      subCategory: 'Computer Desk',
      description: 'Computer Desk Nilkamal'
    }
  ];

  // Combine static and dynamic sub-categories
  const allCategories = [...assetSubCategories, ...subCategories];

  // Filter combined categories
  const filteredCategories = allCategories.filter(item =>
    item.assetCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Asset Sub Category List</h1>
          <div className="text-sm text-gray-500">
            <span className="text-blue-500 hover:underline cursor-pointer">Dashboard</span>
            <span className="mx-2">/</span>
            <span>Manage</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleOpenModal}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex items-center">
              <label htmlFor="search" className="text-sm text-gray-600 mr-2">Search:</label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-gray-600 font-medium">
                    Id
                    <button className="ml-1 text-gray-400 hover:text-gray-600">
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 3l3 3H3l3-3z"/>
                      </svg>
                    </button>
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-gray-600 font-medium">
                    Asset Category
                    <button className="ml-1 text-gray-400 hover:text-gray-600">
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 3l3 3H3l3-3z"/>
                      </svg>
                    </button>
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-gray-600 font-medium">
                    Sub Category
                    <button className="ml-1 text-gray-400 hover:text-gray-600">
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 3l3 3H3l3-3z"/>
                      </svg>
                    </button>
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center text-gray-600 font-medium">
                    Description
                    <button className="ml-1 text-gray-400 hover:text-gray-600">
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 3l3 3H3l3-3z"/>
                      </svg>
                    </button>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCategories.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 text-gray-900">{item.assetCategory}</td>
                  <td className="px-6 py-4 text-gray-900">{item.subCategory}</td>
                  <td className="px-6 py-4 text-gray-900">{item.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="bg-slate-700 hover:bg-slate-800 text-white p-2 rounded">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
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
              Showing 1 to {filteredCategories.length} of {allCategories.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="px-3 py-1 text-sm text-gray-400 bg-gray-100 border border-gray-300 rounded cursor-not-allowed"
              >
                Previous
              </button>
              <button className="px-3 py-1 text-sm text-white bg-blue-500 border border-blue-500 rounded">
                1
              </button>
              <button
                className="px-3 py-1 text-sm text-gray-400 bg-gray-100 border border-gray-300 rounded cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AssetSubCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSubCategory}
      />
    </div>
  );
}