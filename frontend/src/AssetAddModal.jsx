import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const AssetAddModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Basic Info");
  useEffect(() => { if (isOpen) setActiveTab("Basic Info"); }, [isOpen]);
  const tabs = ["Basic Info", "Other Info", "Asset Assign"];
  if (!isOpen) return null;

  const handleSave = () => {
    if (activeTab === "Basic Info") setActiveTab("Other Info");
    else if (activeTab === "Other Info") setActiveTab("Asset Assign");
    else if (activeTab === "Asset Assign") onClose();
  };

  const input = (label, props = {}) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input {...props} className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${props.className || ""}`} />
    </div>
  );
  const select = (label, options, props = {}) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select {...props} className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${props.className || ""}`}>
        {options.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
      </select>
    </div>
  );
  const textarea = (label, props = {}) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <textarea {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === "Basic Info") return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {input("Asset Model No", { type: "text" })}
        {input("Name", { type: "text" })}
        {textarea("Description", { rows: 3 })}
        {input("Unit Price", { type: "number" })}
        {select("Asset Status", [["", "- select -"], ["active", "Active"], ["inactive", "Inactive"], ["maintenance", "Under Maintenance"]])}
        {input("Date Of Purchase", { type: "date", placeholder: "dd-mm-yyyy" })}
        {select("Category", [["", "-- select --"], ["hardware", "Hardware"], ["software", "Software"], ["furniture", "Furniture"]])}
        {select("Sub Category", [["", "-- select --"], ["laptop", "Laptop"], ["desktop", "Desktop"], ["monitor", "Monitor"]])}
        {select("Supplier", [["", "-- select --"], ["supplier1", "Supplier 1"], ["supplier2", "Supplier 2"], ["supplier3", "Supplier 3"]])}
        {select("Department", [["", "-- select --"], ["it", "IT Department"], ["hr", "HR Department"], ["finance", "Finance Department"]])}
        <div className="md:col-span-2">
          {select("Sub Department", [["", "Technical Support Specialist"], ["network", "Network Administration"], ["security", "Security Team"], ["helpdesk", "Help Desk"]])}
        </div>
      </div>
    );
    if (activeTab === "Other Info") return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {input("Date Of Manufacture", { type: "date", placeholder: "dd-mm-yyyy" })}
        {input("Warranty In Month", { type: "date", placeholder: "dd-mm-yyyy" })}
        {input("Depreciation In Month", { type: "date", placeholder: "dd-mm-yyyy" })}
        {input("Location", { type: "text" })}
        {input("Image", { type: "file", accept: "image/*" })}
        {textarea("Note", { rows: 3 })}
        <div className="md:col-span-2">
          {input("Created Date", { type: "date", placeholder: "dd-mm-yyyy" })}
        </div>
      </div>
    );
    if (activeTab === "Asset Assign") return (
      <div className="grid grid-cols-1 gap-6">
        {select("Assign Employee", [["", "-- select --"], ["employee1", "John Doe"], ["employee2", "Jane Smith"], ["employee3", "Mike Johnson"], ["employee4", "Sarah Wilson"]])}
      </div>
    );
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-medium text-gray-800">Add</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
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
            <button onClick={handleSave} className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors">
              {activeTab === "Asset Assign" ? "Save & Close" : "Save & Next"}
            </button>
            <button onClick={onClose} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAddModal;