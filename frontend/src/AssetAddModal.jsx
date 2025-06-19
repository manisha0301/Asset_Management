import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const AssetAddModal = ({ isOpen, onClose, onAddAsset, assetToEdit }) => {
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [formData, setFormData] = useState({
    assetModelNo: "",
    name: "",
    description: "",
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
    barcodeSVG: "", // New field to store barcode SVG
  });
  const [isJsBarcodeLoaded, setIsJsBarcodeLoaded] = useState(false);

  // Load JsBarcode and set flag
  useEffect(() => {
    if (window.JsBarcode) {
      setIsJsBarcodeLoaded(true);
    } else {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js";
      script.async = true;
      script.onload = () => setIsJsBarcodeLoaded(true);
      script.onerror = () => console.error("Failed to load JsBarcode");
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  // Handle form data initialization
  useEffect(() => {
    if (isOpen) {
      if (assetToEdit) {
        setFormData({
          ...formData,
          ...assetToEdit,
        });
      } else {
        setActiveTab("Basic Info");
        setFormData({
          assetModelNo: "",
          name: "",
          description: "",
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
          barcodeSVG: "",
        });
      }
    }
  }, [isOpen, assetToEdit]);

  // Generate barcode when assetModelNo changes
  useEffect(() => {
    const barcodeElement = document.getElementById("barcode");
    if (barcodeElement) {
      barcodeElement.innerHTML = ""; // Clear previous barcode
    }

    if (isJsBarcodeLoaded && formData.assetModelNo && barcodeElement) {
      try {
        window.JsBarcode("#barcode", formData.assetModelNo, {
          format: "CODE128",
          displayValue: true,
          fontSize: 14,
          height: 60,
          width: 2,
          textMargin: 2,
          margin: 10,
          background: "#ffffff",
          lineColor: "#000000",
        });
        // Capture the SVG content
        const svgContent = barcodeElement.outerHTML;
        setFormData((prev) => ({ ...prev, barcodeSVG: svgContent }));
      } catch (error) {
        console.error("Barcode generation failed:", error);
        if (barcodeElement) {
          barcodeElement.innerHTML = `<text x="10" y="30" font-size="14" fill="#000">Invalid model number</text>`;
        }
        setFormData((prev) => ({ ...prev, barcodeSVG: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, barcodeSVG: "" }));
    }
  }, [formData.assetModelNo, isJsBarcodeLoaded]);

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
        status: formData.status || "Available",
        assignedEmployee: formData.assignedEmployee || "Unassigned",
      };
      onAddAsset(updatedAsset);
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
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
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
            placeholder: "e.g., XPS-13-9300",
          })}
          {input("Name", { type: "text", name: "name", value: formData.name })}
          {textarea("Description", {
            rows: 1,
            name: "description",
            value: formData.description,
          })}
          {select(
            "Asset Status",
            [
              ["", "- select -"],
              ["Active", "Active"],
              ["Inactive", "Inactive"],
              ["Under Maintenance", "Under Maintenance"],
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
              ["Electronics", "Electronics"],
              ["Non-Electronics", "Non-Electronics"],
            ],
            { name: "category", value: formData.category }
          )}
          {select(
            "Sub Category",
            [
              ["", "-- select --"],
              ["Laptop", "Laptop"],
              ["Desktop", "Desktop"],
              ["Monitor", "Monitor"],
            ],
            { name: "subCategory", value: formData.subCategory }
          )}
          {select(
            "Department",
            [
              ["", "-- select --"],
              ["IT Department", "IT Department"],
              ["HR Department", "HR Department"],
              ["Finance Department", "Finance Department"],
            ],
            { name: "department", value: formData.department }
          )}
          {input("Image", { type: "file", name: "image", accept: "image/*" })}
          <div className="flex flex-col items-center">
            {isJsBarcodeLoaded && formData.assetModelNo ? (
              <svg
                id="barcode"
                className="w-full h-28"
                style={{ display: "block" }}
              ></svg>
            ) : (
              <div className="w-full h-28 flex items-center justify-center border border-gray-300 rounded">
                <span className="text-xs text-gray-600">
                  {isJsBarcodeLoaded
                    ? "Enter model number to generate barcode"
                    : "Loading barcode generator..."}
                </span>
              </div>
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
          {textarea("Note", { rows: 2, name: "note", value: formData.note })}
          {input("Created Date", {
            type: "date",
            name: "createdDate",
            value: formData.createdDate,
          })}
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
          <div className="flex justify-start gap-3 pt-6">
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