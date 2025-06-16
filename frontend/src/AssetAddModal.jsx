import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const AssetAddModal = ({ isOpen, onClose, onAddAsset, assetToEdit }) => {
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [formData, setFormData] = useState({
    assetModelNo: "",
    name: "",
    description: "",
    unitPrice: "",
    status: "",
    dateOfPurchase: "",
    category: "",
    subCategory: "",
    supplier: "",
    department: "",
    subDepartment: "",
    dateOfManufacture: "",
    warrantyInMonth: "",
    depreciationInMonth: "",
    location: "",
    image: "/api/placeholder/60/60",
    note: "",
    createdDate: "",
    assignedEmployee: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (assetToEdit) {
        // Pre-populate form with assetToEdit data
        setFormData({
          ...formData,
          ...assetToEdit,
          unitPrice: assetToEdit.unitPrice?.toString() || "", // Convert number to string for input
        });
      } else {
        // Reset form for adding new asset
        setActiveTab("Basic Info");
        setFormData({
          assetModelNo: "",
          name: "",
          description: "",
          unitPrice: "",
          status: "",
          dateOfPurchase: "",
          category: "",
          subCategory: "",
          supplier: "",
          department: "",
          subDepartment: "",
          dateOfManufacture: "",
          warrantyInMonth: "",
          depreciationInMonth: "",
          location: "",
          image: "/api/placeholder/60/60",
          note: "",
          createdDate: "",
          assignedEmployee: "",
        });
      }
    }
  }, [isOpen, assetToEdit]);

  const tabs = ["Basic Info", "Other Info", "Asset Assign"];

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (activeTab === "Basic Info") {
      setActiveTab("Other Info");
    } else if (activeTab === "Other Info") {
      setActiveTab("Asset Assign");
    } else if (activeTab === "Asset Assign") {
      const updatedAsset = {
        ...formData,
        unitPrice: parseFloat(formData.unitPrice) || 0,
        status: formData.status || "Available",
        assignedEmployee: formData.assignedEmployee || "Unassigned",
      };
      onAddAsset(updatedAsset); // This will handle both add and edit
      onClose();
    }
  };

  const input = (label, props = {}) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        onChange={handleInputChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          props.className || ""
        }`}
      />
    </div>
  );

  const select = (label, options, props = {}) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        {...props}
        onChange={handleInputChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
          props.className || ""
        }`}
      >
        {options.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );

  const textarea = (label, props = {}) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        {...props}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === "Basic Info") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {input("Asset Model No", {
            type: "text",
            name: "assetModelNo",
            value: formData.assetModelNo,
          })}
          {input("Name", { type: "text", name: "name", value: formData.name })}
          {textarea("Description", {
            rows: 3,
            name: "description",
            value: formData.description,
          })}
          {input("Unit Price", {
            type: "number",
            name: "unitPrice",
            value: formData.unitPrice,
          })}
          {select(
            "Asset Status",
            [
              ["", "- select -"],
              ["active", "Active"],
              ["inactive", "Inactive"],
              ["maintenance", "Under Maintenance"],
            ],
            { name: "status", value: formData.status }
          )}
          {input("Date Of Purchase", {
            type: "date",
            name: "dateOfPurchase",
            value: formData.dateOfPurchase,
          })}
          {select(
            "Category",
            [
              ["", "-- select --"],
              ["hardware", "Hardware"],
              ["software", "Software"],
              ["furniture", "Furniture"],
            ],
            { name: "category", value: formData.category }
          )}
          {select(
            "Sub Category",
            [
              ["", "-- select --"],
              ["laptop", "Laptop"],
              ["desktop", "Desktop"],
              ["monitor", "Monitor"],
            ],
            { name: "subCategory", value: formData.subCategory }
          )}
          {select(
            "Supplier",
            [
              ["", "-- select --"],
              ["supplier1", "Supplier 1"],
              ["supplier2", "Supplier 2"],
              ["supplier3", "Supplier 3"],
            ],
            { name: "supplier", value: formData.supplier }
          )}
          {select(
            "Department",
            [
              ["", "-- select --"],
              ["it", "IT Department"],
              ["hr", "HR Department"],
              ["finance", "Finance Department"],
            ],
            { name: "department", value: formData.department }
          )}
          <div className="md:col-span-2">
            {select(
              "Sub Department",
              [
                ["", "Technical Support Specialist"],
                ["network", "Network Administration"],
                ["security", "Security Team"],
                ["helpdesk", "Help Desk"],
              ],
              { name: "subDepartment", value: formData.subDepartment }
            )}
          </div>
        </div>
      );
    }
    if (activeTab === "Other Info") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {input("Date Of Manufacture", {
            type: "date",
            name: "dateOfManufacture",
            value: formData.dateOfManufacture,
          })}
          {input("Warranty In Month", {
            type: "number",
            name: "warrantyInMonth",
            value: formData.warrantyInMonth,
          })}
          {input("Depreciation In Month", {
            type: "number",
            name: "depreciationInMonth",
            value: formData.depreciationInMonth,
          })}
          {input("Location", {
            type: "text",
            name: "location",
            value: formData.location,
          })}
          {input("Image", { type: "file", name: "image", accept: "image/*" })}
          {textarea("Note", { rows: 3, name: "note", value: formData.note })}
          <div className="md:col-span-2">
            {input("Created Date", {
              type: "date",
              name: "createdDate",
              value: formData.createdDate,
            })}
          </div>
        </div>
      );
    }
    if (activeTab === "Asset Assign") {
      return (
        <div className="grid grid-cols-1 gap-6">
          {select(
            "Assign Employee",
            [
              ["", "-- select --"],
              ["John Doe", "John Doe"],
              ["Jane Smith", "Jane Smith"],
              ["Mike Johnson", "Mike Johnson"],
              ["Sarah Wilson", "Sarah Wilson"],
            ],
            { name: "assignedEmployee", value: formData.assignedEmployee }
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-medium text-gray-800">{assetToEdit ? "Edit Asset" : "Add Asset"}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 mx-4 transition-colors ${
                activeTab === tab
                  ? "text-blue-600 border-blue-600 bg-blue-50"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">
          {renderTabContent()}
          <div className="flex justify-start gap-3 mt-8 pt-6">
            <button
              onClick={handleSave}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              {activeTab === "Asset Assign" ? "Save & Close" : "Save & Next"}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAddModal;