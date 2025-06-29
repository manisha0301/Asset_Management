import React from "react";
import { X } from "lucide-react";

export default function AssetViewModal({ isOpen, onClose, asset }) {
  if (!isOpen || !asset) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Asset Details</h2>
          <button
            onClick={onClose}
            className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-0">
            {/* Asset Model No */}
            <div className="flex">
              <div className="w-1/3 p-3 font-medium text-gray-700">Asset Model No</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.assetModelNo}</div>
            </div>

            {/* Name */}
            <div className="flex bg-gray-100">
              <div className="w-1/3 p-3 font-medium text-gray-700">Name</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.name}</div>
            </div>

            {/* Description */}
            <div className="flex">
              <div className="w-1/3 p-3 font-medium text-gray-700">Description</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.description || "N/A"}</div>
            </div>

            {/* Asset Status */}
            <div className="flex bg-gray-100">
              <div className="w-1/3 p-3 font-medium text-gray-700">Asset Status</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.status}</div>
            </div>

            {/* Date Of Purchase */}
            <div className="flex">
              <div className="w-1/3 p-3 font-medium text-gray-700">Date Of Purchase</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.dateOfPurchase}</div>
            </div>

            {/* Category */}
            <div className="flex bg-gray-100">
              <div className="w-1/3 p-3 font-medium text-gray-700">Category</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.category || "N/A"}</div>
            </div>

            {/* Sub Category */}
            <div className="flex">
              <div className="w-1/3 p-3 font-medium text-gray-700">Sub Category</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.subCategory || "N/A"}</div>
            </div>

            {/* Department */}
            <div className="flex bg-gray-100">
              <div className="w-1/3 p-3 font-medium text-gray-700">Department</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.department || "N/A"}</div>
            </div>

            {/* Date Of Manufacture */}
            <div className="flex">
              <div className="w-1/3 p-3 font-medium text-gray-700">Date Of Manufacture</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.dateOfManufacture || "N/A"}</div>
            </div>

            {/* Warranty In Month */}
            <div className="flex bg-gray-100">
              <div className="w-1/3 p-3 font-medium text-gray-700">Warranty In Month</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.warrantyInMonth || "N/A"}</div>
            </div>

            {/* Depreciation In Month */}
            <div className="flex">
              <div className="w-1/3 p-3 font-medium text-gray-700">Depreciation In Month</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.depreciationInMonth || "N/A"}</div>
            </div>

            {/* Location */}
            <div className="flex bg-gray-100">
              <div className="w-1/3 p-3 font-medium text-gray-700">Location</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.location || "N/A"}</div>
            </div>

            {/* Image */}
            <div className="flex">
              <div className="w-1/3 p-3 font-medium text-gray-700">Image</div>
              <div className="w-2/3 p-3 text-gray-600">
                <img
                  src={asset.image}
                  alt="Asset"
                  className="w-16 h-12 object-cover rounded"
                />
              </div>
            </div>

            {/* Barcode */}
            <div className="flex bg-gray-100">
              <div className="w-1/3 p-3 font-medium text-gray-700">Barcode</div>
              <div className="w-2/3 p-3 text-gray-600">
                {asset.barcodeSVG ? (
                  <div
                    className="w-32 h-20 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: asset.barcodeSVG }}
                  />
                ) : (
                  <span>No barcode available</span>
                )}
              </div>
            </div>

            {/* Note */}
            <div className="flex">
              <div className="w-1/3 p-3 font-medium text-gray-700">Note</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.note || "N/A"}</div>
            </div>

            {/* Created Date */}
            <div className="flex bg-gray-100">
              <div className="w-1/3 p-3 font-medium text-gray-700">Created Date</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.createdDate || "N/A"}</div>
            </div>

            {/* Assigned Employee */}
            <div className="flex">
              <div className="w-1/3 p-3 font-medium text-gray-700">Assigned Employee</div>
              <div className="w-2/3 p-3 text-gray-600">{asset.assignedEmployee || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}