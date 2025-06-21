import React, { useEffect, useState } from "react";
import { Edit, Trash2, Eye, Copy, Download, FileText, Printer } from "lucide-react";
import AssetViewModal from "./AssetViewModal";
import AssetAddModal from "./AssetAddModal";
import EditAssetForm from "./EditAssetForm";
import BarcodeModal from "./BarcodeModal";

const TABLE_HEADERS = [
  { label: "Id", sortable: true },
  { label: "Image", sortable: true },
  { label: "Asset Model No" },
  { label: "Name", sortable: true },
  { label: "Assigned Employee", sortable: true },
  { label: "Date Of Purchase" },
  { label: "Barcode" },
  { label: "Status" },
  { label: "Action" },
];

const SortIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 1L9 5H3L6 1ZM6 11L3 7H9L6 11Z" />
  </svg>
);

export default function AssetList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // For AssetViewModal
  const [editModalOpen, setEditModalOpen] = useState(false); // For EditAssetForm
  const [addModalOpen, setAddModalOpen] = useState(false); // For AssetAddModal
  const [barcodeModalOpen, setBarcodeModalOpen] = useState(false); // For BarcodeModal
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedBarcodeSVG, setSelectedBarcodeSVG] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [assets, setAssets] = useState([
    {
      id: "1",
      image: "/api/placeholder/60/60",
      assetModelNo: "Dell Inspiron 2332",
      name: "MBA",
      assignedEmployee: "Radhika Gandhi",
      dateOfPurchase: "2023-02-16",
      status: "Available",
      barcodeSVG: "",
    },
    {
      id: "2",
      image: "/api/placeholder/60/60",
      assetModelNo: "DELL-6526",
      name: "DELL INSPIRON 14",
      assignedEmployee: "Rakesh Jain",
      dateOfPurchase: "2023-02-08",
      status: "Available",
      barcodeSVG: "",
    },
  ]);
  const itemsPerPage = 10;

  const handleAddAsset = (newAsset) => {
    setAssets((prevAssets) => [
      ...prevAssets,
      {
        ...newAsset,
        id: prevAssets.length + 1,
        status: newAsset.status || "Available",
        assignedEmployee: newAsset.assignedEmployee || "Unassigned",
      },
    ]);
  };

  const handleEditAsset = (updatedAsset) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === updatedAsset.id
          ? {
              ...updatedAsset,
              status: updatedAsset.status || "Available",
              assignedEmployee: updatedAsset.assignedEmployee || "Unassigned",
            }
          : asset
      )
    );
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleEditClick = (asset) => {
    setSelectedAsset(asset);
    setEditModalOpen(true);
  };

  const handleDeleteAsset = (id) => {
    setAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
  };

  const handleBarcodeClick = (barcodeSVG) => {
    if (barcodeSVG) {
      setSelectedBarcodeSVG(barcodeSVG);
      setBarcodeModalOpen(true);
    }
  };

  useEffect(() => setCurrentPage(1), [searchTerm]);

  const filteredAssets = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.assetModelNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.assignedEmployee.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Asset List</h1>
        <div className="text-sm text-gray-500">Dashboard / Manage</div>
      </div>

      {/* Action Buttons and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddClick}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex items-center">
              <label htmlFor="search" className="text-sm text-gray-600 mr-2">
                Search:
              </label>
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

      {/* Asset Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {TABLE_HEADERS.map((h) => (
                  <th
                    key={h.label}
                    className="text-left p-4 text-gray-600 font-medium"
                  >
                    <div className="flex items-center gap-2">
                      {h.label}
                      {h.sortable && <SortIcon />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedAssets.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedAsset(asset);
                          setModalOpen(true);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {asset.id}
                    </div>
                  </td>
                  <td className="p-4">
                    <img
                      src={asset.image || "/api/placeholder/60/60"}
                      alt="Asset"
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-4 text-gray-700">{asset.assetModelNo}</td>
                  <td className="p-4 text-gray-700">{asset.name}</td>
                  <td className="p-4 text-gray-700">{asset.assignedEmployee}</td>
                  <td className="p-4 text-gray-700">{asset.dateOfPurchase}</td>
                  <td className="p-4">
                    {asset.barcodeSVG ? (
                      <div
                        className="w-16 h-16 flex items-center justify-center cursor-pointer"
                        dangerouslySetInnerHTML={{ __html: asset.barcodeSVG }}
                        onClick={() => handleBarcodeClick(asset.barcodeSVG)}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-600">No barcode</span>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {asset.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors"
                        onClick={() => handleEditClick(asset)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                        onClick={() => handleDeleteAsset(asset.id)}
                      >
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
        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          <div className="text-gray-600 text-sm">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAssets.length)} of{" "}
            {filteredAssets.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">
              {currentPage}
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AssetViewModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedAsset(null);
        }}
        asset={selectedAsset}
      />
      <AssetAddModal
        isOpen={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setSelectedAsset(null);
        }}
        onAddAsset={handleAddAsset}
      />
      <EditAssetForm
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedAsset(null);
        }}
        onSubmit={handleEditAsset}
        asset={selectedAsset}
      />
      <BarcodeModal
        isOpen={barcodeModalOpen}
        onClose={() => {
          setBarcodeModalOpen(false);
          setSelectedBarcodeSVG(null);
        }}
        barcodeSVG={selectedBarcodeSVG}
      />
    </div>
  );
}